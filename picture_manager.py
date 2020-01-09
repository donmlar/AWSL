import config
import leveldb
import os
import hashlib
import os, sys


# print(file_list)



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



def resetPicDB():
    db = leveldb.LevelDB('picdb./db')

    b = leveldb.WriteBatch()
    for k in db.RangeIter(include_value = False, reverse = True):
        b.Delete(k)
    db.Write(b)

    filter = [".png"]
    # file_list=os.walk(config.photo_path)
    path = config.photo_path

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
                b.Put(sha1.encode("utf-8"), filename.encode("utf-8"))

    db.Write(b)


def fullPicDB():
    db = leveldb.LevelDB('picdb./db')

    keys_values = list(db.RangeIter())
    print(len(keys_values))

if __name__ == "__main__":
    resetPicDB()
    fullPicDB()