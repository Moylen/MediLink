import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'appointment_page.dart';

class ServiceDetailPage extends StatefulWidget {
  final dynamic service;
  final int patientId;
  final String token;

  ServiceDetailPage(
      {required this.service, required this.patientId, required this.token});

  @override
  _ServiceDetailPageState createState() => _ServiceDetailPageState();
}

class _ServiceDetailPageState extends State<ServiceDetailPage> {
  DateTime _selectedDate = DateTime.now();
  String? _selectedTimeSlot;
  bool _isLoading = false;

  final List<String> _timeSlots = [
    '09:00',
    '11:00',
    '11:30',
    '13:00',
    '15:00',
    '15:30',
    '17:30',
  ];

  Future<void> createServiceRecord() async {
    setState(() {
      _isLoading = true;
    });

    // Combine date and time slot
    DateTime selectedDateTime = DateTime(
      _selectedDate.year,
      _selectedDate.month,
      _selectedDate.day,
      int.parse(_selectedTimeSlot!.split(":")[0]),
      int.parse(_selectedTimeSlot!.split(":")[1]),
    );

    // Format the combined DateTime
    String formattedDate =
        DateFormat('yyyy-MM-dd HH:mm:ss').format(selectedDateTime);

    var url = Uri.parse('http://45.89.65.109/care-records');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var body = json.encode({
      'dateOfRecord': formattedDate,
      'status': 'planned',
      'patientId': widget.patientId,
      'careId': widget.service['id'],
    });

    var response = await http.post(url, headers: headers, body: body);
    print(response.body);
    if (response.statusCode == 201) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => AppointmentPage(widget.patientId, widget.token),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Ошибка при создании записи')),
      );
    }

    setState(() {
      _isLoading = false;
    });
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
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.service['name']),
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.service['name'],
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 16),
                  Text(widget.service['description']),
                  SizedBox(height: 16),
                  Text('Цена: ${widget.service['price']}'),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Text(
                        'Выберите дату:',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(width: 8),
                      TextButton(
                        onPressed: () => _selectDate(context),
                        child: Text(
                            DateFormat('dd.MM.yyyy').format(_selectedDate)),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Выберите временной слот:',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Expanded(
                    child: GridView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 3, // Number of columns
                        childAspectRatio: 3, // Aspect ratio of the items
                        crossAxisSpacing: 8.0,
                        mainAxisSpacing: 8.0,
                      ),
                      itemCount: _timeSlots.length,
                      itemBuilder: (context, index) {
                        return ChoiceChip(
                          label: Text(_timeSlots[index]),
                          selected: _selectedTimeSlot == _timeSlots[index],
                          onSelected: (selected) {
                            setState(() {
                              _selectedTimeSlot = _timeSlots[index];
                            });
                          },
                        );
                      },
                    ),
                  ),
                  Spacer(),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _selectedTimeSlot != null
                          ? createServiceRecord
                          : null,
                      child: Text('Записаться'),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
