/**
 * يحقن بيانات schema.org في الصفحة.
 * مكوّن خادم بحت — لا يصل إلى الحزمة التي تُنفَّذ في المتصفح.
 */
export default function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
