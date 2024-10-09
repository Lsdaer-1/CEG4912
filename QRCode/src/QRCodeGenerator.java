import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class QRCodeGenerator {

    // URL linked to the QR Code image
    private static final String URL = "http://www.intelligentBookManagementSystem.com";
    // Image save path
    private static final String QR_CODE_IMAGE_PATH = "./QRCode.png";

    public static void main(String[] args) {
        try {
            // Generate QR code and save it as an image
            generateQRCodeImage(URL, 350, 350, QR_CODE_IMAGE_PATH);
            System.out.println("QR Code has been generated and saved at the path: " + QR_CODE_IMAGE_PATH);
        } catch (WriterException | IOException e) {
            System.err.println("Failed to generate QR code: " + e.getMessage());
        }
    }

    // Function to generate the QR code image
    private static void generateQRCodeImage(String text, int width, int height, String filePath)
            throws WriterException, IOException {
        // Create a QRCodeWriter object
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        // Encode the text content into a QR code bitmap
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        // Specify the path to save the image file
        Path path = FileSystems.getDefault().getPath(filePath);
        // Write the QR code bitmap into a PNG file
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }
}
