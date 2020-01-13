# Generated by Django 2.2.6 on 2020-01-13 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Model', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='pic_tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50)),
                ('sha', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50)),
                ('tag_p', models.CharField(max_length=50)),
            ],
        ),
    ]
