import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:flutter_application_1/pages/layout.dart';

class AppointmentPage extends StatefulWidget {
  final int patientId;
  final String token;

  AppointmentPage(this.patientId, this.token);

  @override
  _AppointmentPageState createState() => _AppointmentPageState();
}

class _AppointmentPageState extends State<AppointmentPage> {
  Map<String, List<dynamic>> _appointmentsByDate = {};
  Map<String, List<dynamic>> _recordsByDate = {};
  List<dynamic> _appointmentsForPatient = [];
  bool _isLoading = true;

  String formatDateTime(String dateTimeString) {
    DateTime dateTime = DateTime.parse(dateTimeString);
    return DateFormat('HH:mm').format(dateTime);
  }

  String formatDate(String dateTimeString) {
    DateTime dateTime = DateTime.parse(dateTimeString);
    return DateFormat('dd.MM.yyyy').format(dateTime);
  }

  @override
  void initState() {
    super.initState();
    fetchAppointments();
    fetchAppointmentsForPatient();
  }

  Future<void> fetchAppointments() async {
    var url = Uri.parse(
        'http://45.89.65.109/doctor-records?patient_id=${widget.patientId}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> appointments = json.decode(response.body);

      setState(() {
        // Фильтрация записей со статусом 'planned'
        appointments = appointments
            .where((appointment) => appointment['status'] == 'planned')
            .toList();

        // Группировка записей по дате
        _appointmentsByDate = {};
        for (var appointment in appointments) {
          String date = formatDate(appointment['timetable']['time']);
          if (_appointmentsByDate[date] == null) {
            _appointmentsByDate[date] = [];
          }
          _appointmentsByDate[date]!.add(appointment);
        }

        // Сортировка записей внутри каждой даты по времени
        for (var date in _appointmentsByDate.keys) {
          _appointmentsByDate[date]!.sort((a, b) =>
              DateTime.parse(a['timetable']['time'])
                  .compareTo(DateTime.parse(b['timetable']['time'])));
        }

        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('Не удалось загрузить записи');
    }
  }

  Future<void> fetchAppointmentsForPatient() async {
    var url = Uri.parse(
        'http://45.89.65.109/care-records?patient_id=${widget.patientId}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> careRecords = json.decode(response.body);

      setState(() {
        // Фильтрация записей со статусом 'planned'
        careRecords = careRecords
            .where((record) => record['status'] == 'planned')
            .toList();

        // Группировка записей по дате
        _recordsByDate = {};
        for (var careRecord in careRecords) {
          String date = formatDate(careRecord['dateOfRecord']);
          if (_recordsByDate[date] == null) {
            _recordsByDate[date] = [];
          }
          _recordsByDate[date]!.add(careRecord);
        }

        // Сортировка записей внутри каждой даты по времени
        for (var date in _recordsByDate.keys) {
          _recordsByDate[date]!.sort((a, b) => DateTime.parse(a['dateOfRecord'])
              .compareTo(DateTime.parse(b['dateOfRecord'])));
        }

        // Добавление записей на услуги к общему списку
        _appointmentsForPatient.addAll(careRecords);
        print(_recordsByDate);
        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('Не удалось загрузить записи');
    }
  }

  @override
  Widget build(BuildContext context) {
    Set<String> allDatesSet = {
      ..._appointmentsByDate.keys,
      ..._recordsByDate.keys
    };
    List<String> sortedDates = allDatesSet.toList()
      ..sort((a, b) => DateFormat('dd.MM.yyyy')
          .parse(b)
          .compareTo(DateFormat('dd.MM.yyyy').parse(a)));

    return Scaffold(
      appBar: AppBar(
        title: Text('Запись'),
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : _appointmentsByDate.isEmpty && _appointmentsForPatient.isEmpty
              ? Center(
                  child: Text('Нет предстоящих записей'),
                )
              : ListView(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Выберите, на что хотите записаться',
                            style: TextStyle(fontSize: 18),
                          ),
                          SizedBox(height: 10),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              ElevatedButton.icon(
                                onPressed: () {
                                  Navigator.pushNamed(context, '/doctors');
                                },
                                icon: Icon(Icons.person),
                                label: Text('Прием у врача'),
                              ),
                              ElevatedButton.icon(
                                onPressed: () {
                                  Navigator.pushNamed(context, '/cares');
                                },
                                icon: Icon(Icons.biotech),
                                label: Text('Исследование'),
                              ),
                            ],
                          ),
                          SizedBox(height: 20),
                          Text(
                            'Предстоящие записи на приемы и услуги',
                            style: TextStyle(
                              fontSize: 18,
                            ),
                          ),
                          SizedBox(height: 10),
                          ...sortedDates.map((date) {
                            List<dynamic> appointmentsForDate =
                                _appointmentsByDate[date] ?? [];
                            List<dynamic> recordsForDate =
                                _recordsByDate[date] ?? [];

                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text(
                                    date,
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                                Column(
                                  children: [
                                    ...appointmentsForDate.map((appointment) {
                                      final doctor =
                                          appointment['timetable']['doctor'];
                                      final timetable =
                                          appointment['timetable'];

                                      return ListTile(
                                        title: Text(
                                          'Врач: ${doctor['firstName']} ${doctor['lastName']}',
                                          style: TextStyle(fontSize: 16),
                                        ),
                                        subtitle: Text(
                                          'Время: ${formatDateTime(timetable['time'])}',
                                          style: TextStyle(fontSize: 14),
                                        ),
                                      );
                                    }).toList(),
                                    ...recordsForDate.map((record) {
                                      final care = record['care'];
                                      final time = record['dateOfRecord'];

                                      return ListTile(
                                        title: Text(
                                          'Услуга: ${care['name']}',
                                          style: TextStyle(fontSize: 16),
                                        ),
                                        subtitle: Text(
                                          'Время: ${formatDateTime(time)}',
                                          style: TextStyle(fontSize: 14),
                                        ),
                                      );
                                    }).toList(),
                                  ],
                                ),
                              ],
                            );
                          }).toList(),
                        ],
                      ),
                    ),
                  ],
                ),
    );
  }
}
