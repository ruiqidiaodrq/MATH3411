from collections import Counter
from math import comb, log
from itertools import combinations
import math
from fractions import Fraction

def string_split(message):
    new = message.split(',')
    new = [float(n) for n in new]
    return new

def string_split_int(message):
    new = message.split(',')
    new = [int(n) for n in new]
    return new

def check_isbn(isbn):
    result = 0
    for i, digit in enumerate(isbn):
        result += (i+1)*digit
    return result % 11

def check_isbn_digit(isbn):
    result = 0
    for i in range(0,len(isbn)-1):
        result += (i+1)*isbn[i]
    return result % 11


# Check isbn validity, if given a digit, give correct one
def given_wrong_digit_isbn(isbn, given=-1):
    isbn = isbn.split(',')
    isbn = [int(n) for n in isbn if n.isdigit()]
    if not isbn:  # Check if list is empty to avoid IndexError
        print("Error: ISBN list is empty!")
        return
    if check_isbn_digit(isbn) == isbn[-1] and check_isbn(isbn) == 0:
        return True
    return False

# Kraft McMillan condition
def kraft_mcmillan(radix, length):
    result = 0
    length = string_split(length)
    for element in length:
        result += (1/float(radix))**element
    return result

    
# LZ78 - Encoding
def LZ78_encoding(message):
    dictionary = {0: ''}
    output = []
    r = list(str(message))
    index = 1
    current = ''

    while len(r):
        current += r.pop(0)  
        if current not in dictionary.values():
            prefix_index = next(k for k, v in dictionary.items() if v == current[:-1])
            output.append((prefix_index, current[-1]))
            dictionary[index] = current
            index += 1
            current = ''
    
    return [[i, j] for i, j in output]


# Shannon Entropy
def shannon_entropy(prob, radix):
    result = 0
    prob = string_split(prob)
    for p in prob:
        result -= p * log(p, int(radix))
    return result

def shannon_average(prob, radix):
    result = 0
    prob = string_split(prob)
    for p in prob:
        result += p * math.ceil(-math.log(p, int(radix)))
    return result
    
    
def trial_division(number):
    number = int(number)
    for n in range(2, math.ceil(math.sqrt(number))):
        if number % n == 0:
            # print(f'{number} is a composite')
            return False
    return True
    # print(f'{number} is a prime')

def euler_totient(n):
    count = 0
    n = int(n)
    for i in range(1, n):
        if math.gcd(i, n) == 1:  # Check if i and n are coprime
            count += 1
    return count


# def arithmetic_encoding(symbols, probabilities, sequence):
#     low = 0.0
#     high = 1.0
    
#     for symbol in sequence:
#         range_width = high - low
#         index = symbols.index(symbol)
#         high = low + range_width * sum(probabilities[:index+1])
#         low = low + range_width * sum(probabilities[:index])
    
#     return (low + high) / 2

# # Example usage
# symbols = ['A', 'B', 'C', 'D', 'E']
# probabilities = [0.1, 0.2, 0.3, 0.2, 0.2]
# sequence = ['B', 'A', 'D']

# encoded_value = arithmetic_encoding(symbols, probabilities, sequence)
# print(f"Encoded value: {encoded_value}")


# def arithmetic_decoding(symbols, probabilities, encoded_value, sequence_length):
#     low = 0.0
#     high = 1.0
#     decoded_sequence = ''
    
#     for _ in range(sequence_length):
#         range_width = high - low
#         for i, symbol in enumerate(symbols):
#             symbol_low = low + range_width * sum(probabilities[:i])
#             symbol_high = low + range_width * sum(probabilities[:i+1])
            
#             if symbol_low <= encoded_value < symbol_high:
#                 decoded_sequence += symbol
#                 low = symbol_low
#                 high = symbol_high
#                 break
    
#     return decoded_sequence

# # Example usage
# decoded_sequence = arithmetic_decoding(symbols, probabilities, encoded_value, len(sequence))
# print(f"Decoded sequence: {decoded_sequence}")

# Arithmetic coding - Encoding
# Given source index (start by 1) and probabity
def arithmetic_encoding(src, prob):
    start = 0
    width = 1
    src = string_split(src)
    prob = string_split(prob)
    interval_prob = [0]*len(prob)
    src = [n-1 for n in src]
    
    for i in range(1, len(prob)):
        interval_prob[i] = interval_prob[i-1] + prob[i-1]
    for s in src:
        temp_start = start + interval_prob[int(s)]*width
        width = width * prob[int(s)]
        start = temp_start
    
    # return width
    # return (start, start+width, width)
    # return expected
    return (start, start+width, (2*start+width)/2)


def pseudo_prime(a, n):
    a = int(a)
    n = int(n)
    if math.gcd(a, n) != 1 or a ** (n-1) % n != 1:
        print(f'{n} is a composite')
        return False
    print(f'{n} is a pseudo-prime to base {a}')
    return True

# Arithmetic coding - Decoding
# # Given source symbols and probabity and encoded message
# def arithmetic_decoding(src, prob, scale):
#     src = [s.strip() for s in src.split(',')]
#     prob = string_split(prob)
#     scale = float(scale)
    
#     interval_prob = [0]*len(prob)
#     for i in range(1, len(prob)):
#         interval_prob[i] = interval_prob[i-1] + prob[i-1]
#     interval_prob = [(interval_prob[n], interval_prob[n]+prob[n]) for n in range(len(prob))]
#     decode = ''
#     index = -1
#     while len(decode) == 0 or decode[-1] != src[-1]:
#         for i, interval in enumerate(interval_prob):
#             start, end = interval
#             if start <= scale and scale < end:
#                 decode += src[i]
#                 index = i
#                 start_index = start
#                 break
#         scale = (scale - start_index) / prob[index]
#     return decode
#     # print(f"Decoded message is {decode}")


# def arithmetic_encoding(src, prob):
#     src = list(map(int, src.split(',')))  # Convert CSV string to list of integers
#     prob = list(map(float, prob.split(',')))  # Convert CSV string to list of probabilities

#     start = 0.0
#     width = 1.0
#     interval_prob = [0.0] * (len(prob) + 1)

#     # Compute cumulative probability intervals
#     for i in range(1, len(prob) + 1):
#         interval_prob[i] = interval_prob[i - 1] + prob[i - 1]

#     for s in src:
#         temp_start = start + interval_prob[s] * width
#         width *= prob[s]
#         start = temp_start

#     return (start, start + width, width)


# def arithmetic_decoding(src, prob, scale):
#     # src = src.split(',')  # Convert string to list of symbols
#     src = [s.strip() for s in src.split(',')]
#     print(src)
#     prob = list(map(float, prob.split(',')))  # Convert probabilities
#     scale = float(scale)  # Convert scale to float

#     interval_prob = [0.0] * (len(prob) + 1)

#     # Compute cumulative probability intervals
#     for i in range(1, len(prob) + 1):
#         interval_prob[i] = interval_prob[i - 1] + prob[i - 1]
    
#     intervals = [(interval_prob[i], interval_prob[i + 1]) for i in range(len(prob))]

#     decoded_message = ''
    
#     while len(decoded_message) < len(src):  
#         for i, (start, end) in enumerate(intervals):
#             if start <= scale < end:
#                 decoded_message += src[i]
#                 scale = (scale - start) / prob[i]  # Normalize the scale
#                 break  # Move to the next symbol decoding

#     return decoded_message
