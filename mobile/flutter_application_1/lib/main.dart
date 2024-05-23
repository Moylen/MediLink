import 'package:flutter/material.dart';
import 'pages/registration_page.dart';
import 'pages/login_page.dart';
import 'pages/appointment_page.dart';
import 'pages/upcoming_appointments_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MediLink',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/register': (context) => RegistrationPage(),
        '/appointments': (context) => AppointmentPage(),
        '/upcomingappointments': (context) => UpcomingAppointmentsPage(),
      },
    );
  }
}
