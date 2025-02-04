from collections import Counter
from math import comb, log
from itertools import combinations
import math
from fractions import Fraction

def string_split(message):
    new = message.split(',')
    new = [float(n) for n in new]
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
    # format check.
    isbn = isbn.split(',')
    isbn = [int(n) for n in isbn if n.isdigit()]
    if not isbn:  # Check if list is empty to avoid IndexError
        print("Error: ISBN list is empty!")
        # print(isbn)
        return 
    # print(isbn)
    # If isbn is correct.
    if check_isbn_digit(isbn) == isbn[-1] and check_isbn(isbn) == 0:
        # print("This isbn is valid")
        return True
    # print("Overall modulo is", check_isbn(isbn))
    # print("Check digit modulo is", check_isbn_digit(isbn))
    # # if wrong digit is given.
    # if given != -1:
    #     print(f"Given digit is the {given}th")
    #     for i in range(10):
    #         isbn[given-1] = i
    #         if check_isbn_digit(isbn) == isbn[-1] and check_isbn(isbn) == 0:
    #             print("Correct digit is", str(i))
    #             return False
    
    # print("Either the digit given is wrong/ not given or multiple errors occur")
    return False

# # Sphere-packing condition theorem    
def sphere_packing_check(C_size, n_length, t_error, radix=2):
    result = 0
    for i in range(t_error + 1):
        result += comb(n_length, i)*(radix-1)**(i)
    print(f"|C|*volume: {C_size}*{result} =", C_size * result)
    print(f"radix^length: {radix}^{n_length} =", radix**n_length)
    print(C_size * result <= radix**n_length)

# Check ascii code
def check_ascii_code(matrix):
    # given in continuous string digit
    for i, arr in enumerate(matrix):
        matrix[i] = [int(n) for n in list(arr)]
        
    cols = [0]*len(matrix[0])
    for i in range(len(matrix)):
        if sum(matrix[i][1:]) % 2 != matrix[i][0]:
            print(f'{i+1}th row has an incorrect digit')
        if i < len(matrix) - 1:
            for j in range(len(matrix[i])):
                cols[j] += matrix[i][j]
        else:
            for x, n in enumerate(cols):
                if n % 2 != matrix[i][x]:
                    print(f'{x+1}th column has an incorrect digit')


# Calculating minimum Hamming distance
def minimum_distance(array):
    comb = list(combinations(array, 2))
    smallest = float('inf')
    for c in comb:
        count = 0
        for i in range(len(c[0])):
            if c[0][i] != c[1][i]:
                count += 1
        if count < smallest:
            smallest = count
    print(comb)
    return 'The minimum distance is ' + str(smallest)

# Calculating minimum Hamming weight
def minimum_weight(array):
    smallest = float('inf')
    for arr in array:
        curr = 0
        for ele in arr:
            if ele != 0:
                curr += 1
        if curr < smallest:
            smallest = curr
    return 'The minimum weight is ' + str(smallest)

# Kraft McMillan condition
def kraft_mcmillan(radix, length):
    result = 0
    length = string_split(length)
    for element in length:
        result += (1/float(radix))**element
    return result
    # return f'Code with {radix} radix and length {length}: ' + str(result <= 1) + f' ({result})'

# Expected/ average length of binary Huffman code
def avg_length_binary(prob, denom):
    result = 0
    child = 0
    while len(prob) > 1:
        prob.sort()
        child = (prob[0] + prob[1])
        result += child
        prob.pop(0)
        prob[0] = child
    print(f'{denom*result}/{denom}')
    return "Average binary Huffman length: " + str(result)
        
# Arithmetic coding - Encoding
# Given source index (start by 1) and probabity
def arithmetic_encoding(src, prob):
    start = 0
    width = 1
    interval_prob = [0]*len(prob)
    src = [n-1 for n in src]
    
    for i in range(1, len(prob)):
        interval_prob[i] = interval_prob[i-1] + prob[i-1]
    for s in src:
        temp_start = start + interval_prob[s]*width
        width = width * prob[s]
        start = temp_start
    print(f"Interval: {(start, start+width)}, width: {width}")
    

# Arithmetic coding - Decoding
# Given source symbols and probabity and encoded message
def arithmetic_decoding(src, prob, scale):
    interval_prob = [0]*len(prob)
    for i in range(1, len(prob)):
        interval_prob[i] = interval_prob[i-1] + prob[i-1]
    interval_prob = [(interval_prob[n], interval_prob[n]+prob[n]) for n in range(len(prob))]
    decode = ''
    index = -1
    while len(decode) == 0 or decode[-1] != src[-1]:
        for i, interval in enumerate(interval_prob):
            start, end = interval
            if start <= scale and scale < end:
                decode += src[i]
                index = i
                start_index = start
                break
        scale = (scale - start_index) / prob[index]
    print(f"Decoded message is {decode}")
        
    
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
    # print(dictionary)

    # print("Encoded Output:", output)
    
    return [[i, j] for i, j in output]

# LZ78 - Decoding
def LZ78_decoding(output):
    dictionary = {0: ''}
    for i, element in enumerate(output):
        index, symbol = element
        dictionary[i+1] = dictionary[index] + symbol
    return dictionary
    # print("Decoded messages are values concatenations:", dictionary)

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
    

# Average length of general Huffman code
def average_length_general(radix: int, prob: list, denom, dummy=True):
    average = 0
    if len(prob) % (radix - 1) != 1 and dummy:
        while True:
            prob.append(0)
            if len(prob) % (radix - 1) == 1:
                break
    while prob[0] != 1:
        print(average, prob)
        prob.sort()
        temp = sum(prob[:radix])
        average += temp
        prob = prob[radix:]
        prob.append(temp)
    print("average length:", average)
    print(f"fraction form: {average * denom} / {denom}")
    
    
def fermat_factorisation(n, bound):
    for t in range(math.ceil(math.sqrt(n)), n+1):
        s = math.sqrt(t**2 - n)
        a = t - s
        b = t + s
        if s.is_integer() and a < b and bound <= a and a*b == n:
            print("t: ", t)
            print("s: ", s)
            print("a: ", a)
            print("b: ", b)
            return a, b
            # print(s)

def inverse_element(a, m):
    for inv in range(m):
        if inv*a % m == 1:
            # print(inv)
            return inv
            
def Markov_entropy(M, P, radix):
    result = 0
    for i in range(len(P)):
        result += P[i] * shannon_entropy(M[i], radix)
    print("Markov entropy is:", result)
    print("Equilibrium entropy is:", shannon_entropy(P, radix))
    
def trial_division(number):
    for n in range(2, math.ceil(math.sqrt(number))):
        if number % n == 0:
            print(f'{number} is a composite')
            return
    print(f'{number} is a prime')

def pseudo_prime(a, n):
    if math.gcd(a, n) != 1 or a ** (n-1) % n != 1:
        print(f'{n} is a composite')
        return
    print(f'{n} is a pseudo-prime to base {a}')
    

    
def miller_rabin(a, n):
    if math.gcd(a,n) != 1 or a ** (n-1) % n != 1:
        print('Not a prime')
        return
    s = 0
    t = 1
    temp = n - 1
    while True:
        if temp % 2 == 0:
            s += 1
            temp /= 2
        else:
            t = temp
            break
    for r in range(0, s):
        if a **(t * (2**r)) % n == (n - 1):
            print(f'{n} is a strong pseudo-prime base {a}')
            return
    if a**t % n == 1:
        print(f'{n} is a strong pseudo-prime base {a}')
        return
    print(f'Not a strong pseudo-prime')
    
from fractions import Fraction

def generate_probabilities(extension_level, probs):
    """
    Generate probabilities for each path up to the given extension level in fraction form.
    
    Parameters:
    - extension_level (int): The level of extension to calculate probabilities for.
    - probs (list of Fraction): Probabilities at each branch in fraction form (e.g., [Fraction(2, 3), Fraction(1, 3)]).
    
    Returns:
    - list of Fraction: Probabilities for each path at the given extension level in fraction form.
    """
    # Base case for recursion: if at extension level 1, return initial probabilities
    if extension_level == 1:
        return probs
    
    # Recursive case: get probabilities from the previous extension level
    previous_probs = generate_probabilities(extension_level - 1, probs)
    new_probs = []
    
    # For each probability in the previous level, multiply by each branching probability
    for p in previous_probs:
        for prob in probs:
            new_probs.append(p * prob)
    new_probs.sort()
    return new_probs

def order(n, p):
    result = []
    curr = n
    while True:
        if curr in result:
            break
        result.append(curr)
        curr = (curr * n) % p
    print(len(result))
    return len(result)

# if the order is p-1 (cyclic)
def unit(p):
    result = []
    for i in range(p):
        if math.gcd(i, p) == 1:
            result.append(i)
    print(f"Unit of ring {p}:", result)
    return result

# if the order is p-1 (cyclic) and n is a primitive
def primitive_element(n, p):
    result = []
    euler = euler_totient(p)
    power = unit(euler)
    for i in power:
        result.append((n**i)%p)
    print(f"Primitive elements of Z{p}", result)
    return result


def shannon_code_length(prob, radix):
    print([math.ceil(-math.log(n, radix)) for n in prob])
    
def dot_product(a, b):
    print(sum([a[i]*b[i] for i in range(len(a))]))
    
def binary_entropy(x):
    return -x*math.log(x,2) - (1-x)*math.log(1-x, 2)

def char_to_shift(char):
    """Convert a character to its shift value (A=0, B=1, ..., Z=25)."""
    return ord(char) - ord('A')

def shift_char(char, shift):
    """Shift a character by a given amount (wrap around with modulo 26)."""
    return chr(((ord(char) - ord('A') + shift) % 26) + ord('A'))

def cipher_feedback_cipher(plaintext, keyword):
    # Convert plaintext and keyword to uppercase without spaces
    plaintext = plaintext.replace(" ", "").upper()
    keyword = keyword.upper()
    
    # Initialize the shifts based on the keyword
    shifts = [char_to_shift(k) for k in keyword]
    
    # Encipher the message
    ciphertext = []
    for i, char in enumerate(plaintext):
        # Determine the shift for the current character
        current_shift = shifts[i] if i < len(shifts) else char_to_shift(ciphertext[i - len(keyword)])
        
        # Encipher the character
        enciphered_char = shift_char(char, current_shift)
        ciphertext.append(enciphered_char)
        
        # Update shifts with the enciphered character's shift value
        shifts.append(char_to_shift(enciphered_char))
    
    # Join the ciphertext list into a string
    return "".join(ciphertext)



def plaintext_feedback(plaintext, key):
    # Prepare the plaintext and key in uppercase without spaces
    plaintext = plaintext.replace(" ", "").upper()
    key = key.upper()
    
    # Initialize ciphertext list to store results
    ciphertext = []
    
    # Encipher each character
    for p_char, k_char in zip(plaintext, key):
        # Calculate shift for the plaintext character using the corresponding key character
        shift = ord(k_char) - ord('A')
        encrypted_char = chr((ord(p_char) - ord('A') + shift) % 26 + ord('A'))
        ciphertext.append(encrypted_char)
    
    # Join the ciphertext list into a single string
    return "".join(ciphertext)

def char_to_shift(char):
    """Convert a character to its shift value (A=0, B=1, ..., Z=25)."""
    return ord(char) - ord('A')

def shift_char(char, shift, direction=1):
    """Shift a character by a given amount (wrap around with modulo 26).
    Direction = 1 for enciphering, -1 for deciphering."""
    return chr((ord(char) - ord('A') + direction * shift) % 26 + ord('A'))

def cipher_feedback_decipher(ciphertext, keyword):
    # Convert ciphertext and keyword to uppercase without spaces
    ciphertext = ciphertext.replace(" ", "").upper()
    keyword = keyword.upper()
    
    # Initialize shifts based on the keyword
    shifts = [char_to_shift(k) for k in keyword]
    
    # Decipher the message
    plaintext = []
    for i, char in enumerate(ciphertext):
        # Determine the shift for the current character
        current_shift = shifts[i] if i < len(shifts) else char_to_shift(ciphertext[i - len(keyword)])
        
        # Decipher the character
        deciphered_char = shift_char(char, current_shift, direction=-1)
        plaintext.append(deciphered_char)
        
        # Update shifts with the deciphered character's shift value
        shifts.append(char_to_shift(char))
    
    # Join the plaintext list into a string
    return "".join(plaintext)


def vigenere_cipher(text, key):
    # Convert the text and key to uppercase to handle case insensitivity
    text = text.upper()
    key = key.upper()
    
    # Extend the key to match the length of the text
    extended_key = key + text[:-len(key)]
    
    # Initialize the encrypted text result
    encrypted_text = ''
    
    # Loop through the characters in the text and extended key
    for i in range(len(text)):
        # Calculate the shift based on the extended key
        text_char = ord(text[i]) - ord('A')
        key_char = ord(extended_key[i]) - ord('A')
        
        # Encrypt the character
        encrypted_char = (text_char + key_char) % 26
        encrypted_text += chr(encrypted_char + ord('A'))
    
    return encrypted_text

def index_of_coincidence(text):
    freq = Counter(text)
    temp = sum([n**2 for n in freq.values()])
    size = len(text)
    print('Index of coincidence:', (temp - size) / (size**2 - size))
    ioc = (temp - size) / (size**2 - size)
    r = 0.0273*size / ((size-1)*ioc - 0.0385 * size + 0.0658)
    print('keyword length:', r)
    # return (temp - size) / (size**2 - size)
    
    from math import gcd

def euler_totient(n):
    count = 0
    for i in range(1, n):
        if math.gcd(i, n) == 1:  # Check if i and n are coprime
            count += 1
    return count

def standard_coding():
    result = {}
    l = '01_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for i in range(len(l)):
        result[l[i]] = i
    return result

def inv_standard_coding():
    result = {}
    l = '01_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for i in range(len(l)):
        result[i] = l[i]
    return result

def rsa(e, n, p=None, q=None, en=None, de=None):
    to = 0
    check = inv_standard_coding()
    if n:
        to = euler_totient(n)
    else:
        n = p*q
        to = (p-1)*(q-1)
    if math.gcd(e, to) != 1:
        print('e is not a coprime')
        return
    d = inverse_element(e, to)
    print("d is", d)
    if en:
        print(f'The entryption for {en} is', pow(en, e, n))
        return pow(en, e, n)
    if de:
        print(f'The decryption for {de} is', pow(de, d, n))
        # print(f'The decryption for {de} is', check[de**d%n])
        return pow(de, d, n)

def gcd_extended(a, b):
    """
    Extended Euclidean Algorithm.
    Returns gcd(a, b), and coefficients x and y such that a * x + b * y = gcd(a, b).
    """
    if a == 0:
        return b, 0, 1
    else:
        gcd, x1, y1 = gcd_extended(b % a, a)
        # Update x and y using results of recursion
        x = y1 - (b // a) * x1
        y = x1
        return gcd, x, y

def bezout_identity(a, b):
    """
    Finds the gcd of a and b and the coefficients x and y that satisfy Bezout's Identity:
    a * x + b * y = gcd(a, b)
    """
    gcd, x, y = gcd_extended(a, b)
    print(f"GCD of {a} and {b} is {gcd}")
    print(f"Coefficients x and y are: x = {x}, y = {y}")
    return gcd, x, y

def cyclotomic_cosets(p, n):
    """
    Compute the cyclotomic cosets modulo (p^n - 1) over GF(p^n).
    
    Parameters:
    p (int): The characteristic of the finite field (e.g., 2 for GF(2^n)).
    n (int): The degree of the field extension (e.g., 3 for GF(2^3)).
    
    Returns:
    list: A list of cyclotomic cosets, each represented as a list of integers.
    """
    modulus = p**n - 1
    cosets = {}
    visited = [False] * modulus
    
    for i in range(modulus):
        if not visited[i]:
            coset = []
            power = i
            while power not in coset:
                coset.append(power)
                visited[power] = True
                power = (power * p) % modulus
            cosets[i] = coset
    
    return cosets

    
def binary_elements():
    pass

def binary_polynomial_division(deg, Ix, mx):
    curr_deg = deg
    mx.reverse()
    
    while mx and curr_deg >= len(mx) - 1:
        Ix.reverse()
        for i in range(len(mx)):
            Ix[i] = ( mx[i] + Ix[i] ) % 2
        while Ix and Ix[0] == 0:
            Ix.pop(0)
        
        Ix.reverse()
        for i in range(len(Ix)):
            if Ix[i] > 0:
                curr_deg = i
                
    new = [f'x^{i}' for i in range(len(Ix)) if Ix[i] == 1]
    code = ''
    for i in range(len(Ix)):
        code += '1' if Ix[i] == 1 else '0'
    print('I(x) = ', '+'.join(new))
    print('Check bits are:', ''.join(code))

    return new, code

def generate_Im(deg_I, deg_m, Il, ml):
    I = [0 for _ in range(deg_I+1)]
    m = [0 for _ in range(deg_m+1)]
    for i in Il:
        I[i] = 1
    for i in ml:
        m[i] = 1
    print(I, m)
    return I, m   







