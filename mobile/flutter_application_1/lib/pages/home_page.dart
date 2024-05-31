import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/layout.dart';
import 'appointment_page.dart';
import 'personal_area.dart';
import 'medical_card_page.dart';
import 'package:yandex_mapkit/yandex_mapkit.dart' as ymaps;

class HomePage extends StatefulWidget {
  final int patientId;
  final String token;

  HomePage(this.patientId, this.token);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  late int patientId;
  late String token;

  @override
  void initState() {
    super.initState();
    patientId = widget.patientId;
    token = widget.token;
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MyAppLayout(
      selectedIndex: _selectedIndex,
      onItemTapped: _onItemTapped,
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    switch (_selectedIndex) {
      case 0:
        return _HomeContent();
      case 1:
        return MedicCardPage(widget.patientId, widget.token);
      case 2:
        return AppointmentPage(widget.patientId, widget.token);
      case 3:
        return PersonalAreaPage(widget.patientId, widget.token);
      default:
        return Container(); // Вернуть пустой контейнер или другой виджет, если индекс неизвестен
    }
  }
}

class _HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[800],
      child: ListView(
        padding: EdgeInsets.all(16.0),
        children: [
          Image.asset(
            'heart.png',
            fit: BoxFit.cover,
            height: 200,
          ),
          SizedBox(height: 16.0),
          Text(
            'Добро пожаловать в MediLink – вашу виртуальную дверь к заботе о здоровье в нашей частной клинике!',
            style: TextStyle(
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: 16.0),
          _buildSectionTitle('О нас'),
          SizedBox(height: 8.0),
          Text(
            'Мы предлагаем высококлассную медицинскую помощь в уютной атмосфере нашей клиники. Наши специалисты обеспечат вас профессиональным обслуживанием, индивидуальным подходом и современным лечением.',
            style: TextStyle(fontSize: 14.0, color: Colors.white),
          ),
          SizedBox(height: 16.0),
          _buildSectionTitle('Функции приложения MediLink'),
          SizedBox(height: 8.0),
          Text(
            'Запись на прием\n\nС легкостью выбирайте удобное для вас время и специалиста, чтобы записаться на прием или обследование в клинике.',
            style: TextStyle(fontSize: 14.0, color: Colors.white),
          ),
          SizedBox(height: 8.0),
          Text(
            'Просмотр результатов исследований и приемов\n\nВаша электронная медицинская карта и результаты исследований всегда под рукой. Все ваши приемы и данные доступны в личном кабинете, где бы вы ни находились.',
            style: TextStyle(fontSize: 14.0, color: Colors.white),
          ),
          SizedBox(height: 16.0),
          _buildSectionTitle('Наши адреса'),
          SizedBox(height: 8.0),
          SizedBox(height: 8.0),
          // Добавляем Яндекс карту
          SizedBox(
            height: 300, // Высота карты
            child: ymaps.YandexMap(
              onMapCreated: (ymaps.YandexMapController controller) {
                // Действия, которые необходимо выполнить после создания карты
                // Например, установка начального положения и маркеров
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 16.0,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    );
  }
}
