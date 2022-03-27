#!/usr/bin/python3
import sys
from odps import ODPS

o = ODPS('xx', 'xx',project='liumeng', endpoint='http://service.cn-hangzhou.maxcompute.aliyun.com/api')

with o.execute_sql(sys.argv[1]).open_reader() as reader:
  for record in reader:
    print(record)


