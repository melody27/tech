def bytes32_to_string(bytes32_hex):
    # 去掉前缀 0x
    hex_str = bytes32_hex[2:]
    # 将十六进制字符串转换为字节数组
    byte_array = bytes.fromhex(hex_str)
    # 将字节数组转换为字符串，并去掉末尾的空字符（0x00）
    return byte_array.decode('utf-8').rstrip('\x00')

# 给定的bytes32数据
bytes32_data = "0x412076657279207374726f6e67207365637265742070617373776f7264203a29"
# 还原为字符串
string_data = bytes32_to_string(bytes32_data)
print(string_data)
