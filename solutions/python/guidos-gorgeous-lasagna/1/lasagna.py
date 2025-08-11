


EXPECTED_BAKE_TIME = 40 
PREPARATION_TIME = 15

#TODO: Remove 'pass' and complete the 'bake_time_remaining()' function below.
def bake_time_remaining(elapsed_bake_time):
    """Calculate the bake time remaining.

    :param elapsed_bake_time: int - baking time already elapsed.
    :return: int - remaining bake time (in minutes) derived from 'EXPECTED_BAKE_TIME'.

    Function that takes the actual minutes the lasagna has been in the oven as
    an argument and returns how many minutes the lasagna still needs to bake
    based on the `EXPECTED_BAKE_TIME`.
    """
    bake_time_remaining = EXPECTED_BAKE_TIME - elapsed_bake_time 
    
    return bake_time_remaining

bake_time_remaining(10)

    

def preparation_time_in_minutes(number_of_layers):
    """
    the 2 arguments below are the n number of layers, 
    """
    preparation_time = 2 #constant
    total_preparation_time = number_of_layers * preparation_time
    
    return total_preparation_time
    
preparation_time_in_minutes(3)
    


#TODO: define the 'elapsed_time_in_minutes()' function below.
def elapsed_time_in_minutes(number_of_layers,elapsed_bake_time):
    """
    the 2 arguments below are the n number of layers, 
    """
    preparation_time = 2
    total_time = (number_of_layers*preparation_time)+elapsed_bake_time
    return total_time

elapsed_time_in_minutes(2,20)

