import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/appointment_to_doctor.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'appointment_page.dart';

class Doctor {
  final int id;
  final String firstName;
  final String lastName;
  final String department;
  final int experience;
  final String speciality;

  Doctor(
      {required this.id,
      required this.firstName,
      required this.lastName,
      required this.department,
      required this.experience,
      required this.speciality});

  factory Doctor.fromJson(Map<String, dynamic> json) {
    return Doctor(
      id: json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      department: json['department'],
      experience: json['experience'],
      speciality: json['speciality'],
    );
  }
}

class DoctorListPage extends StatefulWidget {
  final int patientId;
  final String token;

  DoctorListPage(
    this.patientId,
    this.token,
  );

  @override
  _DoctorListPageState createState() => _DoctorListPageState();
}

class _DoctorListPageState extends State<DoctorListPage> {
  Map<String, dynamic>? department;
  List<String> _departmentNames = [];
  List<Doctor> _doctors = [];
  List<Doctor> _filteredDoctors = [];
  bool _isLoading = true;
  String _searchText = '';
  String _selectedDepartment = 'Все';

  @override
  void initState() {
    super.initState();
    fetchDepartments().then((_) {
      _filterDoctors();
    });
  }

  Future<void> fetchDepartments() async {
    var url = Uri.parse('http://45.89.65.109/departments');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> departments = json.decode(response.body);
      List<Doctor> doctors = [];
      for (var department in departments) {
        List<dynamic> doctorsData = department['doctors'];
        for (var doctorData in doctorsData) {
          Doctor doctor = Doctor(
            id: doctorData['id'],
            firstName: doctorData['firstName'],
            lastName: doctorData['lastName'],
            department: department['name'],
            experience: doctorData['experience'],
            speciality: doctorData['speciality']['name'],
          );
          doctors.add(doctor);
        }
      }
      setState(() {
        _doctors = doctors;
        _departmentNames = departments
            .map((dynamic department) => department['name'] as String)
            .toList();
        _departmentNames.insert(0, 'Все');
        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('Не удалось загрузить список отделений');
    }
  }

  void _filterDoctors() {
    setState(() {
      _filteredDoctors = _doctors.where((doctor) {
        bool matchesSearch = '${doctor.firstName} ${doctor.lastName}'
            .toLowerCase()
            .contains(_searchText.toLowerCase());
        bool matchesDepartment = _selectedDepartment == 'Все' ||
            doctor.department == _selectedDepartment;
        return matchesSearch && matchesDepartment;
      }).toList();
      _filteredDoctors.sort((a, b) => '${a.firstName} ${a.lastName}'
          .compareTo('${b.firstName} ${b.lastName}'));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Выберите врача'),
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: 'Поиск по имени врача',
                      border: OutlineInputBorder(),
                    ),
                    onChanged: (text) {
                      setState(() {
                        _searchText = text;
                      });
                      _filterDoctors();
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: DropdownButton<String>(
                    isExpanded: true,
                    value: _selectedDepartment.isEmpty
                        ? null
                        : _selectedDepartment,
                    hint: Text('Выберите отделение'),
                    items: _departmentNames.map((String departmentName) {
                      return DropdownMenuItem<String>(
                        value: departmentName,
                        child: Text(departmentName),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        _selectedDepartment = value!;
                      });
                      _filterDoctors();
                    },
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: _filteredDoctors.length,
                    itemBuilder: (context, index) {
                      final doctor = _filteredDoctors[index];
                      return ListTile(
                        title: Text('${doctor.firstName} ${doctor.lastName}'),
                        subtitle: Text(doctor.speciality),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => DoctorAppointmentPage(
                                doctor,
                                widget.patientId,
                                widget.token,
                              ),
                            ),
                          );
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }
}
