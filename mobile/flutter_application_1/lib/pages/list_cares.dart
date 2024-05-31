import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'appointment_page.dart';
import 'appointment_to_care.dart';

class ServicePage extends StatefulWidget {
  final int patientId;
  final String token;

  ServicePage(this.patientId, this.token);

  @override
  _ServicePageState createState() => _ServicePageState();
}

class _ServicePageState extends State<ServicePage> {
  List<dynamic> _services = [];
  List<dynamic> _filteredServices = [];
  bool _isLoading = true;
  TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    fetchServices();
    _searchController.addListener(_filterServices);
  }

  Future<void> fetchServices() async {
    var url = Uri.parse('http://45.89.65.109/cares');
    var headers = {
      'Authorization': 'Bearer ${widget.token}',
      'accept': 'application/json',
    };

    var response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> services = json.decode(response.body);
      setState(() {
        _services = services;
        _filteredServices = services;
        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('Не удалось загрузить услуги');
    }
  }

  void _filterServices() {
    String query = _searchController.text.toLowerCase();
    setState(() {
      _filteredServices = _services
          .where((service) =>
              service['name'].toString().toLowerCase().contains(query))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Услуги'),
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
                    controller: _searchController,
                    decoration: InputDecoration(
                      labelText: 'Поиск услуг',
                      border: OutlineInputBorder(),
                      suffixIcon: Icon(Icons.search),
                    ),
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: _filteredServices.length,
                    itemBuilder: (context, index) {
                      final service = _filteredServices[index];
                      return ListTile(
                        title: Text(service['name']),
                        subtitle: Text(service['description']),
                        trailing: Text('Цена: ${service['price']}'),
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ServiceDetailPage(
                              service: service,
                              patientId: widget.patientId,
                              token: widget.token,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }
}
