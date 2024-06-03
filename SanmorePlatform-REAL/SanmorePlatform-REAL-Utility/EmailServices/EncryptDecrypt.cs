using System.Security.Cryptography;
using System.Text;

namespace SanmorePlatform_REAL_Utility.EmailServices
{
    public class EncryptDecrypt
    {
        string key = "b14ca5898a4e4133bbce2ea2315a1916";
        // to encrypt any string value 
        public string EncryptString(string value)
        {
            byte[] iv = new byte[16];
            byte[] array;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(value);
                        }
                        array = memoryStream.ToArray();
                    }
                }
            }
            return Convert.ToBase64String(array);
        }

        //To decrypt the encrypted string.
        public string DecryptString(string value)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(value);
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }

        public string EncodeBase64(string text)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(text);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public string DecodeBase64(string encodedText)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(encodedText);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }

}
