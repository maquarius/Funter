import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default function LogInSceen(props) {
  const navigationOptions = { title: "LogIn" };
  const { navigate } = props.navigation;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReturn, setPasswordReturn] = useState("");
  const [users, setUsers] = useState({});

  const db = SQLite.openDatabase("funtsdb.db");

  useEffect(() => {
    //db.transaction(callback, error, succes)
    db.transaction(
      (tx) => {
        //db.execute(sqlStatment, arguments, succes, error)
        tx.executeSql(
          "create table if not exists user (id integer primary key not null, user_name text, password text);",
          [],
          (_, rs) =>
            console.log(
              "SQL creating database is executed " + JSON.stringify(rs)
            ),
          (_, err) =>
            console.log(
              "SQL of creating database is wrong" + JSON.stringify(err)
            )
        );
      },
      (err) =>
        console.log(
          "something went wrong with the creation of the database" +
            JSON.stringify(err)
        ),
      updateList()
    );
  }, []);

  const sqlError = (error) => {
    console.log("SQL error: " + err);
  };

  const buttonPressed = () => {
    Alert.alert("Button Pressed");
  };

  const register = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into user (user_name, password) values ( ?, ?);",
          [userName, password],
          (_, rs) =>
            console.log("SQL adding user is executed" + JSON.stringify(rs)),
          (_, err) =>
            console.log(
              "SQL of adding user is wrong with the transaction of " +
                JSON.stringify(_) +
                " Error info: " +
                err.message
            )
        );
      },
      (err) =>
        console.log(
          "something went wrong with adding the user. Error: " +
            JSON.stringify(err)
        ),
      (updateList(),
      Alert.alert(
        "Accoutn created. username: " + userName + " and password: " + password
      ))
    );
  };

  const logIn = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT password FROM user WHERE user_name = '" + userName + "';",
        [],
        (_, { rows }) => setPasswordReturn(rows._array[0].password),
        (_, err) =>
          console.log(
            "something went wrong with retreiving the password. Error message:" +
              err.message
          )
      );
    });

    if (password == passwordReturn) {
      navigate("Home", { user: userName });
    } else {
      Alert.alert(password + " is not the same as " + passwordReturn);
    }
  };

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from user;",
        [],
        (_, { rows }) => (
          setUsers(rows._array),
          console.log(
            "Following users are fetched: " + JSON.stringify(rows._array)
          )
        ),
        (_, err) =>
          console.log(
            "something went wrong fetching users " + JSON.stringify(err)
          )
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.headLine}> Funter</Text>
        <Text style={styles.underText}>
          {" "}
          The sustainable nature scavenger hunter app
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ marginLeft: 5 }}>User name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="User name"
        />
        <Text style={{ marginLeft: 5 }}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
        />
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Button style={styles.button} onPress={() => logIn()} title="Log in" />
        <Text style={{ textAlign: "center", marginLeft: 10, marginRight: 10 }}>
          {" "}
          OR
        </Text>
        <Button
          style={styles.button}
          onPress={() => register()}
          title="Register"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    height: 30,
    margin: 5,
  },
  headLine: {
    fontSize: 50,
    textAlign: "center",
  },
  underText: {
    textAlign: "center",
  },
  button: {},
});
