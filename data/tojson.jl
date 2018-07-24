using JSON

files = ["2.11-narsjo", "2.28-aulestad", "2.32-atnasjo", "2.142-knappom", "2.145-losna", "2.265-unsetaaa", "2.268-akslen", "2.279-kraakfoss"]

data_all = Dict();

for file in files
    
    data = readdlm(file)

    data_all[file] = Dict("time" => DateTime.(data[:,1], data[:,2], data[:,3], data[:,4]),
                          "prec" => data[:,5],
                          "tair" => data[:,6],
                          "qpast" => data[:,14],
                          "qfuture" => data[:,15])

end

fid = open("output.json", "w")

JSON.print(fid, data_all)

close(fid)




