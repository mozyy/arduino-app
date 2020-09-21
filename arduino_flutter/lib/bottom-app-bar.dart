// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_blue/flutter_blue.dart';

class BottomAppBarDemo extends StatefulWidget {
  const BottomAppBarDemo();

  @override
  State createState() => _BottomAppBarDemoState();
}

class _BottomAppBarDemoState extends State<BottomAppBarDemo> {
  var _showFab = true;
  var _showNotch = true;
  var _fabLocation = FloatingActionButtonLocation.endDocked;

  void _onShowNotchChanged(bool value) {
    setState(() {
      _showNotch = value;
    });
  }

  void _onShowFabChanged(bool value) {
    setState(() {
      _showFab = value;
    });
  }

  void _onFabLocationChanged(FloatingActionButtonLocation value) {
    setState(() {
      _fabLocation = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text("app bar"),
      ),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 88),
        children: [
          SwitchListTile(
            title: Text(
              "switch title",
            ),
            value: _showFab,
            onChanged: _onShowFabChanged,
          ),
          SwitchListTile(
            title: Text("switch list tile"),
            value: _showNotch,
            onChanged: _onShowNotchChanged,
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text("Padding"),
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              "RadioListTile",
            ),
            value: FloatingActionButtonLocation.endDocked,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              "RadioListTile",
            ),
            value: FloatingActionButtonLocation.centerDocked,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              "RadioListTile",
            ),
            value: FloatingActionButtonLocation.endFloat,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              "RadioListTile",
            ),
            value: FloatingActionButtonLocation.centerFloat,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
        ],
      ),
      floatingActionButton: _showFab
          ? FloatingActionButton(
              onPressed: () {
                FlutterBlue flutterBlue = FlutterBlue.instance;
                // Start scanning
                flutterBlue.startScan(timeout: Duration(seconds: 4));

                // Listen to scan results
                var subscription = flutterBlue.scanResults.listen((results) {
                    // do something with scan results
                    for (ScanResult r in results) {
                      // if(r.device.name != "") {
                        print('${r.device.name} found! rssi: ${r.rssi}, id: ${r.device.id}');
                      // }
                    }
                });

                print('Floating action button pressed');
              },
              child: const Icon(Icons.add),
              tooltip: "tooltip",
            )
          : null,
      floatingActionButtonLocation: _fabLocation,
      bottomNavigationBar: _DemoBottomAppBar(
        fabLocation: _fabLocation,
        shape: _showNotch ? const CircularNotchedRectangle() : null,
      ),
    );
  }
}

class _DemoBottomAppBar extends StatelessWidget {
  const _DemoBottomAppBar({
    this.fabLocation,
    this.shape,
  });

  final FloatingActionButtonLocation fabLocation;
  final NotchedShape shape;

  static final centerLocations = <FloatingActionButtonLocation>[
    FloatingActionButtonLocation.centerDocked,
    FloatingActionButtonLocation.centerFloat,
  ];

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      shape: shape,
      child: IconTheme(
        data: IconThemeData(color: Theme.of(context).colorScheme.onPrimary),
        child: Row(
          children: [
            IconButton(
              tooltip: MaterialLocalizations.of(context).openAppDrawerTooltip,
              icon: const Icon(Icons.menu),
              onPressed: () {
                print('Menu button pressed');
              },
            ),
            if (centerLocations.contains(fabLocation)) const Spacer(),
            IconButton(
              tooltip: "IconButton",
              icon: const Icon(Icons.search),
              onPressed: () {
                print('Search button pressed');
              },
            ),
            IconButton(
              tooltip:
                  "IconButton",
              icon: const Icon(Icons.favorite),
              onPressed: () {
                print('Favorite button pressed');
              },
            ),
          ],
        ),
      ),
    );
  }
}

