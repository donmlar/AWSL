import os
import subprocess

from django.http import HttpResponse
from django.shortcuts import render


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