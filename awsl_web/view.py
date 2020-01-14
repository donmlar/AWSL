import os
import subprocess
import hashlib
from django.http import HttpResponse
from django.shortcuts import render

# import leveldb
import json

import config
from Model.models import *

def hello(request):
    context = {}
    context['hello'] = 'Hello World!'
    return render(request, 'uploadwh.html', context)




def upload(request):

    print('1111111')
    if request.method == "POST":  # 请求方法为POST时，进行处理
        myFile = request.FILES.get("myfile", None)  # 获取上传的文件，如果没有文件，则默认为None
        seriNo = request.POST.get('seriNo')  # 获取上传的文件，如果没有文件，则默认为None
        user = request.POST.get('user')

    if not myFile:
        return HttpResponse("no files for upload!")

    fileName = user+'_'+seriNo+'.'+myFile.name.split('.')[-1]
    destination = open(os.path.join("D:\\upload", fileName), 'wb+')  # 打开特定的文件进行二进制的写操作


    for chunk in myFile.chunks():  # 分块写入文件
        destination.write(chunk)
    destination.close()

    rrr = subprocess.Popen(
        r"C:\Users\S3\file\py\BaiduPCS-Go-v3.6-windows-x64/BaiduPCS-Go upload "+os.path.join("D:\\upload", fileName)+" /apps",
        shell=True, stdout=subprocess.PIPE)

    f = rrr.stdout.read().decode('UTF-8')

    print(f)


    return HttpResponse("upload over!")

def check(request):

    print('22222')

    f = os.popen(r"C:\Users\S3\file\py\BaiduPCS-Go-v3.6-windows-x64/BaiduPCS-Go update", "r")
    d = f.read()  # 读文件
    print(d)
    print(type(d))
    f.close()


    return HttpResponse("11111")



def check2(request):

    print('22222')

    # db = leveldb.LevelDB('../picdb./db')
    #
    # keys_values = list(db.RangeIter())
    # jsonlist = []
    # for iter in keys_values:
    #     data = {"key":iter[0].decode('utf-8'),"path":iter[1].decode('utf-8')}
    #
    #     jsonlist.append(data)
    #
    #
    # print(keys_values)
    #
    #
    # jo = json.dumps(jsonlist)

    return HttpResponse(11)

def reload(request):

    pic.objects.all().delete()


    print('22222')
    path = config.photo_path
    filter = [".png", ".jpg", ".jpeg"]
    for maindir, subdir, file_name_list in os.walk(path):
        # print(maindir) #当前主目录
        # print(subdir) #当前主目录下的所有目录
        # print(file_name_list) #当前主目录下的所有文件

        for filename in file_name_list:
            apath = os.path.join(maindir, filename)#合并成一个完整路径
            portion = os.path.splitext(apath)
            ext = portion[-1]
            if ext in filter:
                filename = apath
                sha1 = CalcSha1(filename)
                test1 = pic(path=filename,sha=sha1)
                test1.save()

    return HttpResponse('succ')

def loadpic(request):

    print('22222')
    # path = config.photo_path
    # filter = [".png", ".jpg", ".jpeg"]
    # for maindir, subdir, file_name_list in os.walk(path):
    #     # print(maindir) #当前主目录
    #     # print(subdir) #当前主目录下的所有目录
    #     # print(file_name_list) #当前主目录下的所有文件
    #
    #     for filename in file_name_list:
    #         apath = os.path.join(maindir, filename)#合并成一个完整路径
    #         portion = os.path.splitext(apath)
    #         ext = portion[-1]
    #         if ext in filter:
    #             filename = apath
    #             sha1 = CalcSha1(filename)
    #             test1 = pic(path=filename,sha=sha1)
    #             test1.save()

    jsonlist = []
    list = pic.objects.all()[0:10]
    for iter in list:
        data = {"key":iter.sha,"path":iter.path}

        jsonlist.append(data)
    jo = json.dumps(jsonlist, ensure_ascii=False)
    return HttpResponse(jo)





def savetag(request):
    key  = request.POST['key']

    tags  = request.POST.getlist('tags[]')

    pic_tag.objects.filter(sha=key).delete()

    for tag in tags:

        test1 = pic_tag(sha=key,tag=tag)
        test1.save()


    return HttpResponse(1)



def getpictag(request):
    key  = request.POST['key']


    tagObjs = pic_tag.objects.filter(sha=key)

    find_tags = []
    for tag in tagObjs:

        test1 = {"tag":tag.tag}
        find_tags.append(test1)

    jo = json.dumps(find_tags, ensure_ascii=False)

    return HttpResponse(jo)




def CalcSha1(filepath):
    with open(filepath, 'rb') as f:
        sha1obj = hashlib.sha1()
        sha1obj.update(f.read())
        hash = sha1obj.hexdigest()
        print(hash)
        return hash


def CalcMD5(filepath):
    with open(filepath, 'rb') as f:
        md5obj = hashlib.md5()
        md5obj.update(f.read())
        hash = md5obj.hexdigest()
        print(hash)
        return hash