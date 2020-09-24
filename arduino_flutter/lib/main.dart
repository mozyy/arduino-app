import 'package:flutter/material.dart';

import './flutter_bluetooth_serial/MainPage.dart';
import './flutter_bluetooth_serial/ChatPage2.dart';

void main() => runApp(new ExampleApplication());

class ExampleApplication extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // home: MainPage(),
      home: ChatPage(),
      theme: ThemeData(primaryColor: Colors.red),
    );
  }
}
