#!/usr/bin/python3
import sys
from odps import ODPS
o = ODPS('xx', 'xx',project='liumeng', endpoint='http://service.cn-hangzhou.maxcompute.aliyun.com/api')
o.execute_sql(sys.argv[1])

