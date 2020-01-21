from django.db import models

# Create your models here.
class pic(models.Model):
    path = models.CharField(max_length=500)
    sha = models.CharField(max_length=60)



class pic_tag(models.Model):
    tag_parent = models.CharField(max_length=50)
    level = models.IntegerField()
    tag = models.CharField(max_length=50)
    sha = models.CharField(max_length=60)

    class Meta:
        unique_together = ("sha", "tag","level","tag_parent")


class tag(models.Model):
    tag = models.CharField(max_length=50)
    tag_parent = models.CharField(max_length=50)