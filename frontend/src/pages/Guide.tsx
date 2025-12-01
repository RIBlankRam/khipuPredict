export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 p-8 pb-20">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Guía completa para interpretar khipus
        </h1>

        <p className="mb-6 leading-relaxed">
          Esta guía explica cómo leer un khipu utilizando los mismos datos que muestra
          KhipuPredict desde el Open Khipu Repository. Aquí aprenderás el significado de
          colores, nudos, torsión, jerarquías y estructura general del khipu.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-cyan-400">
          1. Estructura del Khipu
        </h2>

        <p className="mb-4">
          Un khipu está compuesto por una cuerda principal de la cual cuelgan las
          cuerdas secundarias. Allí se almacena toda la información numérica y categórica.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-emerald-400">
          2. Sistema de colores (catálogo Ascher – OKR)
        </h2>

        <p className="mb-4">
          Los colores representan categorías administrativas como guerra, tributos,
          censos, producción agrícola y más. KhipuPredict usa el catálogo original
          del OKR para reconstruir estos valores.
        </p>

        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Negro: Guerra, inventarios restringidos</li>
          <li>Rojo: Tributos</li>
          <li>Blanco: Población</li>
          <li>Verde: Agricultura</li>
          <li>Amarillo: Oro o riqueza</li>
          <li>Multicolor: Totales o registros compuestos</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-400">
          3. Tipos de nudos
        </h2>

        <p className="mb-4">
          Cada tipo de nudo representa valores específicos:
        </p>

        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li><strong>S</strong> – Simple knot (unidades)</li>
          <li><strong>L</strong> – Long knot (decenas / centenas)</li>
          <li><strong>E</strong> – Figure-eight knot (casos especiales)</li>
        </ul>

        <p className="mb-4">
          Se leen desde el extremo más cercano a la cuerda principal hacia abajo.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">
          4. Dirección de torsión (S/Z)
        </h2>

        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li><strong>Z</strong> – Categoría principal</li>
          <li><strong>S</strong> – Categoría secundaria</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-400">
          5. Valor numérico
        </h2>

        <p className="mb-4">
          KhipuPredict utiliza el campo <strong>numeric_value</strong> para
          reconstruir el valor matemático completo del nudo.  
          Cuando todos los valores están disponibles, se reconstruyen cantidades como:
          354, 72, 1002, etc.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-400">
          6. Clusters y jerarquías
        </h2>

        <p className="mb-4">
          Los clusters representan agrupaciones de cuerdas con un significado
          administrativo: subtotales, grupos de personas, producción por sectores, etc.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-pink-400">
          7. Interpretación completa en KhipuPredict
        </h2>

        <ul className="list-decimal ml-6 space-y-2 mb-8">
          <li>Carga cuerdas completas</li>
          <li>Asigna colores OKR</li>
          <li>Ordena nudos</li>
          <li>Reconstruye valores numéricos</li>
          <li>Genera grafo visual</li>
          <li>Interpreta categorías y jerarquías</li>
        </ul>

        {/* IMAGEN REFERENCIAL AL FINAL */}
        <div className="mt-10">
          <img
            src="https://coleccion.museolarco.org/public/uploads/ML600004/ML600004_SF1_1734450975.webp"
            alt="Guía visual de khipu"
            className="rounded-lg shadow-lg mx-auto border border-gray-700"
          />
          <p className="text-center text-xs text-gray-500 mt-2">
            Imagen referencial de khipu – Museo Larco
          </p>
        </div>

      </div>
    </div>
  );
}
