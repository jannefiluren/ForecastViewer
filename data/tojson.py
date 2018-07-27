
import re
import json

with open("data.txt") as f:
    lines = f.readlines()

lines = [line.strip() for line in lines] 

datacomplete = {}

for line in lines:
    if re.match(r':', line):
        station = line.replace(":", "")
        datasingle = {
            "time": [],
            "prec": [],
            "tair": [],
            "qpast": [],
            "qfuture": []
        }
    else:
        values = line.split()
        datasingle["time"].append(values[0] + "-" + values[1] + "-" + values[2] + " " + values[3] + ":00")
        datasingle["prec"].append(float(values[4]))
        datasingle["tair"].append(float(values[5]))
        datasingle["qpast"].append(float(values[13]))
        datasingle["qfuture"].append(float(values[14]))
        datacomplete[station] = datasingle

with open('data.json', 'w') as outfile:
    json.dump(datacomplete, outfile)