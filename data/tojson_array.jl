
using Dates
using JSON
using DataStructures
using CSV
using DataFrames

# Read metadata

dfmeta = CSV.read("metadata.csv", delim = ";", decimal = ',')

regine_main = @. string(dfmeta[:regine_area]) * "." * string(dfmeta[:main_no])

# Read file

f = open("data.txt")

lines = readlines(f)

close(f)

# Collect data into nested dictonary

dictparent = OrderedDict()

global station, dictchild, irow

for line in lines

    if (ismatch(r"^:", line))

        station = replace(line, ":" => "")

        irow = findall(regine_main .== split(station, " ")[1])[1]

        dictchild = OrderedDict(
            "time" => [],
            "prec" => [],
            "tair" => [],
            "qpast" => [],
            "qfuture" => [],
            "lat" => missing,
            "lon" => missing,
            "name" => missing,
            "color" => missing
        )

    else

        values = Meta.parse.(split(line))

        push!(dictchild["time"], DateTime(values[1], values[2], values[3] ,values[4]))
        push!(dictchild["prec"], values[5])
        push!(dictchild["tair"], values[6])
        push!(dictchild["qpast"], values[14])
        push!(dictchild["qfuture"], values[15])

        dictchild["lat"] = dfmeta[:latitude][irow]
        dictchild["lon"] = dfmeta[:longitude][irow]
        dictchild["name"] = station
        dictchild["color"] = rand(["green", "yellow", "red"])

        dictparent[station] = dictchild

    end

end

final = []

for data in values(dictparent)

    push!(final, data)

end

# Write to json

f = open("data_array.json", "w")

JSON.print(f, final)

close(f)

