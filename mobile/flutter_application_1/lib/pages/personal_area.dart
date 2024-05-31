import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'dart:convert';

class PersonalAreaPage extends StatefulWidget {
  final int patientId;
  final String token;

  PersonalAreaPage(this.patientId, this.token);

  @override
  _PersonalAreaPageState createState() => _PersonalAreaPageState();
}

class _PersonalAreaPageState extends State<PersonalAreaPage> {
  final _formKey = GlobalKey<FormState>();
  String _firstName = '';
  String _lastName = '';
  String _phoneNumber = '';
  String _email = '';
  DateTime? _birthDate;
  String? _birthDateError;

  var phoneFormatter = MaskTextInputFormatter(
      mask: '+7 ### ### ## ##', filter: {"#": RegExp(r'[0-9]')});

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    var url =
        Uri.parse('http://45.89.65.109/patients/${widget.patientId}');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      var userData = json.decode(response.body);
      setState(() {
        _email = userData['email'];
        _phoneNumber = userData['phoneNumber'];
        _firstName = userData['firstName'];
        _lastName = userData['lastName'];
        _birthDate = DateTime.parse(userData['birthday']);
      });
    } else {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Ошибка'),
          content: Text('Не удалось загрузить данные пользователя'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('OK'),
            ),
          ],
        ),
      );
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _birthDate ?? DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null && picked != _birthDate) {
      setState(() {
        _birthDate = picked;
        _birthDateError = null;
      });
      _formKey.currentState?.save();
    }
  }

  Future<void> _updateProfile() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      var url =
          Uri.parse('http://45.89.65.109/patients/${widget.patientId}');
      var headers = {
        'Authorization': 'Bearer ${widget.token}',
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };
      var body = json.encode({
        'email': _email,
        'phoneNumber': _phoneNumber,
        'firstName': _firstName,
        'lastName': _lastName,
        'birthday': DateFormat('yyyy-MM-dd').format(_birthDate!),
      });

      var response = await http.patch(url, headers: headers, body: body);
      if (response.statusCode == 200) {
        Navigator.of(context).pop();
      } else {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text('Ошибка'),
            content: Text('Не удалось обновить профиль'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: Text('OK'),
              ),
            ],
          ),
        );
      }
    }
  }

  void _logout(BuildContext context) {
    Navigator.of(context).pushReplacementNamed('/auth');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Личный кабинет'),
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () => _logout(context),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: _email.isEmpty &&
                _firstName.isEmpty &&
                _lastName.isEmpty &&
                _phoneNumber.isEmpty &&
                _birthDate == null
            ? Center(child: CircularProgressIndicator())
            : Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      decoration: InputDecoration(labelText: 'Email'),
                      initialValue: _email,
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Введите Email';
                        }
                        if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                          return 'Введите корректный Email';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _email = value!;
                      },
                    ),
                    TextFormField(
                      decoration: InputDecoration(labelText: 'Телефон'),
                      initialValue: _phoneNumber,
                      inputFormatters: [phoneFormatter],
                      keyboardType: TextInputType.phone,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Введите телефон';
                        }
                        return null;
                      },
                      maxLength: 16,
                      onSaved: (value) {
                        _phoneNumber = value!;
                      },
                    ),
                    TextFormField(
                      decoration: InputDecoration(labelText: 'Имя'),
                      initialValue: _firstName,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Введите имя';
                        }
                        if (!RegExp(r'^[а-яА-ЯёЁ]+$').hasMatch(value)) {
                          return 'Имя может содержать только русские буквы';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _firstName = value!;
                      },
                    ),
                    TextFormField(
                      decoration: InputDecoration(labelText: 'Фамилия'),
                      initialValue: _lastName,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Введите фамилию';
                        }
                        if (!RegExp(r'^[а-яА-ЯёЁ]+$').hasMatch(value)) {
                          return 'Фамилия может содержать только русские буквы';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _lastName = value!;
                      },
                    ),
                    Row(
                      children: [
                        Text(
                          _birthDate == null
                              ? 'Дата рождения'
                              : 'Дата рождения: ${DateFormat('dd.MM.yyyy').format(_birthDate!)}',
                        ),
                        IconButton(
                          icon: Icon(Icons.calendar_today),
                          onPressed: () => _selectDate(context),
                        ),
                      ],
                    ),
                    if (_birthDateError != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Text(
                          _birthDateError!,
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _birthDateError = _birthDate == null
                              ? 'Пожалуйста, выберите дату рождения'
                              : null;
                        });
                        if (_formKey.currentState!.validate() &&
                            _birthDate != null) {
                          _formKey.currentState!.save();
                          _updateProfile();
                        }
                      },
                      child: Text('Сохранить изменения'),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
