import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class AppointmentDetailPage extends StatefulWidget {
  final int appointmentId;
  final int patientId;
  final String token;

  AppointmentDetailPage(this.appointmentId, this.patientId, this.token);

  @override
  _AppointmentDetailPageState createState() => _AppointmentDetailPageState();
}

class _AppointmentDetailPageState extends State<AppointmentDetailPage> {
  Map<String, dynamic>? appointment;

  String formatDateTime(String dateTimeString) {
    DateTime dateTime = DateTime.parse(dateTimeString);

    String formattedDateTime = DateFormat('dd.MM.yyyy HH:mm').format(dateTime);

    return formattedDateTime;
  }

  @override
  void initState() {
    super.initState();
    print(widget.appointmentId);
    fetchAppointment();
  }

  Future<void> fetchAppointment() async {
    var url =
        Uri.parse('http://45.89.65.109/appointment/${widget.appointmentId}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      Map<String, dynamic> appointmentData = json.decode(response.body);
      setState(() {
        appointment = appointmentData;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (appointment == null) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Подробная информация'),
        ),
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    final doctor = appointment!['doctorRecord']['timetable']['doctor'];
    final timetable =
        formatDateTime(appointment!['doctorRecord']['timetable']['time']);
    final diagnosis = appointment!['diagnosis'];
    final anamnesis = appointment!['anamnesis'];
    final recommendations = appointment!['recommendations'];
    final comment = appointment!['comment'];

    return Scaffold(
      appBar: AppBar(
        title: Text('Подробная информация'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Диагноз: $diagnosis', style: TextStyle(fontSize: 18)),
            SizedBox(height: 8),
            Text('Анамнез: $anamnesis', style: TextStyle(fontSize: 16)),
            SizedBox(height: 8),
            Text('Рекомендации: $recommendations',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 8),
            Text('Комментарий: $comment', style: TextStyle(fontSize: 16)),
            SizedBox(height: 8),
            Text('Врач: ${doctor['firstName']} ${doctor['lastName']}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 8),
            Text('Дата: ${timetable}', style: TextStyle(fontSize: 16)),
          ],
        ),
      ),
    );
  }
}
