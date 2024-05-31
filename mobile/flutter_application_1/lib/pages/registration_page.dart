import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class RegistrationPage extends StatefulWidget {
  @override
  _RegistrationPageState createState() => _RegistrationPageState();
}

class _RegistrationPageState extends State<RegistrationPage> {
  final _formKey = GlobalKey<FormState>();
  String _firstName = '';
  String _lastName = '';
  String _phoneNumber = '';
  String _email = '';
  String _password = '';
  DateTime? _birthDate;
  String? _birthDateError;

  // Создание маски для телефонного номера
  var phoneFormatter = MaskTextInputFormatter(
      mask: '+7 ### ### ## ##', filter: {"#": RegExp(r'[0-9]')});

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

  Future<void> registerUser() async {
    var url = Uri.parse('http://45.89.65.109/auth/patients/registration');
    try {
      var response = await http.post(
        url,
        body: {
          'firstName': _firstName,
          'lastName': _lastName,
          'phoneNumber': _phoneNumber,
          'email': _email,
          'password': _password,
          'birthday': DateFormat('yyyy-MM-dd').format(_birthDate!),
        },
      );

      if (response.statusCode == 201) {
        Navigator.pushNamed(context, '/auth');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Ошибка при регистрации. Попробуйте еще раз.'),
        ));
      }
    } catch (e) {
      print('Ошибка при отправке запроса: $e');
      // Например, вывод сообщения об ошибке
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Произошла ошибка. Попробуйте еще раз.'),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Регистрация'),
        automaticallyImplyLeading: false,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Имя'),
                textCapitalization: TextCapitalization.words,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Пожалуйста, введите ваше имя';
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
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Пожалуйста, введите вашу фамилию';
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
              TextFormField(
                decoration: InputDecoration(labelText: 'Номер телефона'),
                inputFormatters: [phoneFormatter],
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Пожалуйста, введите ваш номер телефона';
                  }
                  return null;
                },
                maxLength: 16,
                onSaved: (value) {
                  _phoneNumber = value!;
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Пожалуйста, введите ваш email';
                  }
                  if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                    return 'Пожалуйста, введите корректный email';
                  }
                  return null;
                },
                onSaved: (value) {
                  _email = value!;
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Пароль'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Пожалуйста, введите пароль';
                  }
                  if (value.length < 4) {
                    return 'Пароль должен быть не короче 4 символов';
                  }
                  return null;
                },
                onSaved: (value) {
                  _password = value!;
                },
              ),
              SizedBox(height: 20),
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
                  if (_formKey.currentState!.validate() && _birthDate != null) {
                    _formKey.currentState!.save();
                    registerUser();
                  }
                },
                child: Text('Зарегистрироваться'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/auth');
                },
                child: Text('Авторизация'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
