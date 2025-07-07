import { PaymentSuccessEmailProps } from './types';

export async function generatePaymentSuccessEmail({
  fullName,
  items,
  totalAmount,
  orderId,
  paymentId,
  address,
  paymentDate,
}: PaymentSuccessEmailProps): Promise<string> {
  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Оплата подтверждена</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family: Arial, sans-serif; color: #333;">
    <center>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: 20px auto; background-color:#fff; border-radius:8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
          <td align="center" style="background-color:#28a745; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: bold;">Next Pizza</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p style="font-size: 16px; margin: 0 0 10px;">Здравствуйте, <strong>${fullName}</strong>!</p>
            <p style="font-size: 16px; margin: 0 0 20px;">Спасибо за оплату вашего заказа №${orderId}.</p>
            <p style="font-size: 14px; margin: 0 0 20px;">Дата оплаты: <strong>${paymentDate}</strong></p>
            <p style="font-size: 14px; margin: 0 0 20px;">ID платежа: <strong>${paymentId}</strong></p>
            <p style="font-size: 14px; margin: 0 0 20px;">Адрес доставки: <strong>${address}</strong></p>

            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #eee;">
                  <th align="left" style="padding: 10px 8px; font-weight: bold; font-size: 14px; color: #555;">Товар</th>
                  <th align="center" style="padding: 10px 8px; font-weight: bold; font-size: 14px; color: #555;">Кол-во</th>
                  <th align="right" style="padding: 10px 8px; font-weight: bold; font-size: 14px; color: #555;">Цена</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    ({
                      name,
                      quantity,
                      price,
                      type,
                      size,
                      extraIngredients,
                      excludedIngredients,
                    }) => `
                    <tr style="border-bottom: 1px solid #eee; vertical-align: top;">
                      <td style="padding: 10px 8px; font-size: 14px; color: #333;">
                        <div>${name}</div>
                        <div style="font-size: 12px; color: #888; margin-top: 4px; line-height: 1.3;">
                          ${type ? `Тип: ${type}; ` : ''}
                          ${size ? `Размер: ${size}; ` : ''}
                          ${extraIngredients && extraIngredients.length ? `+ Доп.: ${extraIngredients.join(', ')}; ` : ''}
                          ${excludedIngredients && excludedIngredients.length ? `- Искл.: ${excludedIngredients.join(', ')}` : ''}
                        </div>
                      </td>
                      <td align="center" style="padding: 10px 8px; font-size: 14px;">${quantity}</td>
                      <td align="right" style="padding: 10px 8px; font-size: 14px;">${(price * quantity).toFixed(2)} ₴</td>
                    </tr>
                  `,
                  )
                  .join('')}
              </tbody>
            </table>

            <p style="font-weight: bold; font-size: 18px; text-align: right; margin: 20px 0 30px;">
              Итого: ${totalAmount.toFixed(2)} ₴
            </p>

            <p style="font-size: 14px; margin-top: 20px;">
              Если у вас возникнут вопросы, свяжитесь с нашей поддержкой.
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="font-size: 12px; color: #aaa; padding: 15px 10px; border-top: 1px solid #eee;">
            &copy; ${new Date().getFullYear()} Next Pizza. Все права защищены.
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>
  `;
}
