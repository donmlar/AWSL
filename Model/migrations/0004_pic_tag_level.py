# Generated by Django 2.2.6 on 2020-01-17 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Model', '0003_auto_20200116_1704'),
    ]

    operations = [
        migrations.AddField(
            model_name='pic_tag',
            name='level',
            field=models.IntegerField(default=int),
            preserve_default=False,
        ),
    ]
