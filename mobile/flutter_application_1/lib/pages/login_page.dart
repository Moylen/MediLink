import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class LoginPage extends StatefulWidget {
  final Function(int, String) onPatientIdAndTokenReceived;

  LoginPage({required this.onPatientIdAndTokenReceived});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';
  String _password = '';
  String _role = 'Пациент';

  final Map<String, String> roleMapping = {
    'Пациент': 'patient',
    'Доктор': 'doctor',
  };

  Future<void> authUser() async {
    var url = Uri.parse('http://45.89.65.109/auth');
    try {
      var response = await http.post(
        url,
        body: {
          'email': _email,
          'password': _password,
          'role': roleMapping[_role]!,
        },
      );

      if (response.statusCode == 201) {
        var data = json.decode(response.body);
        String _token = data['token'];
        print(_token);
        getUser(_token);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Ошибка при авторизации. Попробуйте еще раз.'),
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

  Future<void> getUser(String token) async {
    var url = Uri.parse('http://45.89.65.109/patients');
    var headers = {
      'Authorization': 'Bearer $token',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      int patientId = data['id'];
      print(patientId);
      widget.onPatientIdAndTokenReceived(patientId, token);
    } else {
      throw Exception('Не удалось получить пользователя');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Авторизация'),
        automaticallyImplyLeading: false,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Пожалуйста, введите ваш email';
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
                    return 'Пожалуйста, введите ваш пароль';
                  }
                  return null;
                },
                onSaved: (value) {
                  _password = value!;
                },
              ),
              SizedBox(height: 20),
              DropdownButtonFormField<String>(
                value: _role,
                onChanged: (newValue) {
                  setState(() {
                    _role = newValue!;
                  });
                },
                items: roleMapping.keys
                    .map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
                decoration: InputDecoration(labelText: 'Роль'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    authUser();
                  }
                },
                child: Text('Войти'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/auth/patients/registration');
                },
                child: Text('Регистрация'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
