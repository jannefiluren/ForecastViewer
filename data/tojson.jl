
using Dates
using JSON

# Read file

f = open("data.txt")

lines = readlines(f)

close(f)

# Collect data into nested dictonary

dictparent = Dict()

global station, dictchild

for line in lines

    if (ismatch(r"^:", line))
        
        station = replace(line, ":" => "")

        dictchild = Dict(
            "time" => [],
            "prec" => [],
            "tair" => [],
            "qpast" => [],
            "qfuture" => []
        )

    else

        values = Meta.parse.(split(line))

        push!(dictchild["time"], DateTime(values[1], values[2], values[3] ,values[4]))
        push!(dictchild["prec"], values[5])
        push!(dictchild["tair"], values[6])
        push!(dictchild["qpast"], values[14])
        push!(dictchild["qfuture"], values[15])
        
        dictparent[station] = dictchild

    end

end

# Write to json

f = open("data.json", "w")

JSON.print(f, dictparent)

close(f)

