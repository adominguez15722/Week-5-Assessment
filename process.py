log_file = open("um-server-01.txt") #this is opening the file so we can access everything on um-server-01.txt file


def sales_reports(log_file): #this is creating a function called sales_reports with the parameter log_file
    for line in log_file: #creating a for loop calling each iteration of the loop line
        line = line.rstrip() #we are changing the value of line to have no trailing spaces in it, which is what .rstrip does
        day = line[0:3] #we are singling out the first 3 characters and assigning them to the variable day
        if day == "Mon": #we are saying if day is equal to Tue then proceed to the next command
            print(line) #this will print out all of the results with the above restrictions


sales_reports(log_file) #we are running our function sales_reports on the file um-server-01.txt
