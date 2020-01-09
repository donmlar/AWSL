import leveldb

db = leveldb.LevelDB('./db')

# single put
db.Put(b'hello', b'hello world')
print(db.Get(b'hello').decode('utf-8'))

# multiple put/delete applied atomically, and committed to disk
batch = leveldb.WriteBatch()
batch.Put(b'hello', b'world')
batch.Put(b'hello again', b'world')

batch.Put(b'3123 123', b'world')
batch.Delete(b'hello')

db.Write(batch, sync = True)


def iter_key_values():
    # db = leveldb.LevelDB('te./db')
    for i in range(10):
        db.Put(str(i).encode("utf-8"), ('string_%s' % i).encode("utf-8"))
    keys = list(db.RangeIter(include_value = False))
    print(keys)

    keys_values = list(db.RangeIter())
    print(keys_values)

iter_key_values()