import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'list_doctors.dart';
import 'appointment_page.dart';

class DoctorAppointmentPage extends StatefulWidget {
  final Doctor doctor;
  final int patientId;
  final String token;

  DoctorAppointmentPage(this.doctor, this.patientId, this.token);

  @override
  _DoctorAppointmentPageState createState() => _DoctorAppointmentPageState();
}

class _DoctorAppointmentPageState extends State<DoctorAppointmentPage> {
  DateTime _selectedDate = DateTime.now();
  List<Map<String, dynamic>> _availableSlots = [];
  bool _isLoading = true;
  int? _selectedSlotId;

  Future<void> fetchAppointment(DateTime date) async {
    var formattedDate = DateFormat('yyyy-MM-dd').format(date);
    var url = Uri.parse(
        'http://45.89.65.109/timetables?date=$formattedDate&doctorId=${widget.doctor.id}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> slots = json.decode(response.body);
      setState(() {
        _availableSlots = slots
            .where((slot) => slot['isFree'] == true)
            .map((slot) => {
                  'time':
                      DateFormat('HH:mm').format(DateTime.parse(slot['time'])),
                  'id': slot['id'],
                })
            .toList();
        _availableSlots.sort((a, b) =>
            a['time'].compareTo(b['time'])); // Сортировка временных слотов
        _isLoading = false;
      });
    } else {
      // Обработка ошибки
      setState(() {
        _availableSlots = [];
        _isLoading = false;
      });
    }
  }

  Future<void> createAppointment() async {
    if (_selectedSlotId == null) return;

    var url = Uri.parse('http://45.89.65.109/doctor-records');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var body = json.encode({
      'patientId': widget.patientId,
      'timetableId': _selectedSlotId,
      'status': 'planned',
    });

    var response = await http.post(url, headers: headers, body: body);
    if (response.statusCode == 201) {
      Navigator.popAndPushNamed(context, '/appointment', arguments: {widget.patientId, widget.token});
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Ошибка при создании записи')),
      );
    }
  }

  void _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime(DateTime.now().year + 1),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
        _isLoading = true;
        fetchAppointment(_selectedDate);
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchAppointment(_selectedDate); // Initial fetch for the current date
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Запись к врачу'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    'Врач:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                  SizedBox(height: 8.0),
                  Text(
                    '${widget.doctor.firstName} ${widget.doctor.lastName}',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  SizedBox(height: 16.0),
                  Text(
                    'Отделение:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                  SizedBox(height: 8.0),
                  Text(
                    '${widget.doctor.department}',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  SizedBox(height: 16.0),
                  Text(
                    'Специальность:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                  SizedBox(height: 8.0),
                  Text(
                    '${widget.doctor.speciality}',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  SizedBox(height: 16.0),
                  Text(
                    'Стаж:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                  SizedBox(height: 8.0),
                  Text(
                    '${widget.doctor.experience}',
                    style: TextStyle(fontSize: 16.0),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                children: <Widget>[
                  Text(
                    'Выберите дату:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                  SizedBox(width: 8.0),
                  TextButton(
                    onPressed: () => _selectDate(context),
                    child: Text(
                      DateFormat('dd.MM.yyyy').format(_selectedDate),
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: _isLoading
                  ? Center(child: CircularProgressIndicator())
                  : _availableSlots.isEmpty
                      ? Text('На выбранную дату нет мест.')
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              'Доступные временные слоты:',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18.0,
                              ),
                            ),
                            SizedBox(height: 8.0),
                            GridView.builder(
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              gridDelegate:
                                  SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 3, // Количество столбцов
                                childAspectRatio:
                                    3, // Соотношение сторон элементов
                                crossAxisSpacing: 8.0,
                                mainAxisSpacing: 8.0,
                              ),
                              itemCount: _availableSlots.length,
                              itemBuilder: (context, index) {
                                return ChoiceChip(
                                  label: Text(_availableSlots[index]['time']),
                                  selected:
                                      _selectedSlotId == _availableSlots[index]['id'],
                                  onSelected: (selected) {
                                    setState(() {
                                      _selectedSlotId =
                                          _availableSlots[index]['id'];
                                    });
                                  },
                                );
                              },
                            ),
                          ],
                        ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _selectedSlotId != null
                      ? createAppointment
                      : null,
                  child: Text('Записаться'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
