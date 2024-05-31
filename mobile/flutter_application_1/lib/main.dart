import 'dart:convert';
import 'package:flutter/material.dart';
import 'pages/registration_page.dart';
import 'pages/login_page.dart';
import 'pages/appointment_page.dart';
import 'pages/personal_area.dart';
import 'pages/home_page.dart';
import 'pages/medical_card_page.dart';
import 'pages/appointment_detail_page.dart';
import 'pages/list_doctors.dart';
import 'pages/appointment_to_doctor.dart';
import 'pages/list_cares.dart';
import 'pages/appointment_to_care.dart';
import 'package:yandex_mapkit/yandex_mapkit.dart' as ymaps;

void main() {
  ymaps.AndroidYandexMap.useAndroidViewSurface = false;
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  late int patientId;
  late String token;
  late int appointmentId;
  late Doctor doctor;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'MediLink',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/auth',
        routes: {
          '/auth': (context) => LoginPage(
                onPatientIdAndTokenReceived: (_patientId, _token) {
                  patientId = _patientId;
                  token = _token;
                  Navigator.pushNamed(context, '/home');
                },
              ),
          '/auth/patients/registration': (context) => RegistrationPage(),
          '/home': (context) => HomePage(patientId, token),
          '/mediccard': (context) => MedicCardPage(patientId, token),
          '/appointment': (context) => AppointmentPage(patientId, token),
          '/appointmentDetail': (context) => AppointmentDetailPage(appointmentId, patientId, token),
          '/doctors': (context) => DoctorListPage(patientId, token),
          '/choose_time_to_doctor_appointment': (context) => DoctorAppointmentPage(doctor, patientId, token),
          '/cares': (context) => ServicePage(patientId, token),
          '/personal_area': (context) => PersonalAreaPage(patientId, token),
        });
  }
}
