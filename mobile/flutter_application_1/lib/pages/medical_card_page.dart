import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'dart:convert';
import 'appointment_detail_page.dart';

class MedicCardPage extends StatefulWidget {
  final int patientId;
  final String token;

  MedicCardPage(this.patientId, this.token);

  @override
  _MedicCardPageState createState() => _MedicCardPageState();
}

class _MedicCardPageState extends State<MedicCardPage> {
  List<dynamic> _appointments = [];
  List<dynamic> _careResults = [];
  bool _isLoading = true;

  String formatDateTime(String dateTimeString) {
    DateTime dateTime = DateTime.parse(dateTimeString);
    String formattedDateTime = DateFormat('dd.MM.yyyy HH:mm').format(dateTime);
    return formattedDateTime;
  }

  @override
  void initState() {
    super.initState();
    fetchAppointments();
    fetchCareResults();
  }

  Future<void> fetchAppointments() async {
    var url = Uri.parse(
        'http://45.89.65.109/appointment?patient_id=${widget.patientId}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> appointments = json.decode(response.body);
      setState(() {
        _appointments = appointments.toList();
        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('Не удалось загрузить записи');
    }
  }

  Future<void> fetchCareResults() async {
    var url = Uri.parse(
        'http://45.89.65.109/care-results?patient_id=${widget.patientId}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> careResults = json.decode(response.body);
      setState(() {
        _careResults = careResults.toList();
        print(_careResults);
        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('Не удалось загрузить результаты исследований');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Медкарта'),
        automaticallyImplyLeading: false,
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      'Результаты приемов',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: _appointments.length,
                    itemBuilder: (context, index) {
                      final appointment = _appointments[index];
                      final doctor =
                          appointment['doctorRecord']['timetable']['doctor'];
                      final timetable =
                          appointment['doctorRecord']['timetable'];
                      final appointmentId = appointment['id'];

                      return ListTile(
                        title: Text('Диагноз: ${appointment['diagnosis']}'),
                        subtitle: Text('Анамнез: ${appointment['anamnesis']}'),
                        trailing: Text(
                            '${formatDateTime(appointment['doctorRecord']['timetable']['time'])}'),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => AppointmentDetailPage(
                                  appointmentId,
                                  widget.patientId,
                                  widget.token),
                            ),
                          );
                        },
                      );
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      'Результаты исследований',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: _careResults.length,
                    itemBuilder: (context, index) {
                      final careResult = _careResults[index];
                      final resultDate = careResult['careRecord']['dateOfRecord'];
                      final name = careResult['careRecord']['care']['name'];
                      final comment = careResult['comment'];
                      final file = careResult['file'];

                      return ListTile(
                        title: Text('$name'),
                        trailing: Text('${formatDateTime(resultDate)}'),
                        subtitle: Text('Комментарий специалиста: ${comment}\nФайл с результатами: ${file}'),
                      );
                    },
                  ),
                ],
              ),
            ),
    );
  }
}
