import 'package:flutter/material.dart';

class MyAppLayout extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemTapped;
  final Widget body;

  MyAppLayout({
    required this.selectedIndex,
    required this.onItemTapped,
    required this.body,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: body,
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Главная',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.book),
            label: 'Медкарта',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            label: 'Запись',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Личный кабинет',
          ),
        ],
        currentIndex: selectedIndex,
        selectedItemColor: Colors.indigo,
        unselectedItemColor: Colors.grey[300],
        onTap: onItemTapped,
        backgroundColor: Colors.grey[800],
      ),
    );
  }
}
