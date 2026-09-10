function generar_xml_agregar() {
    let data_array = [];  // Suponiendo que los datos ya están disponibles, como en tu código anterior.
  
    $.ajax({
      url: 'consulta_agregar_sire_compras.php',
      type: 'POST',
      data: { tipo: '2' },
      dataType: "json",
      success: function (x) {
        // Mapea el resultado para construir el archivo TXT
       
        data_array = x.map(item => {
            const nroCPDocRellenado = item.NRO_CP ? item.NRO_CP.toString().padStart(10, '0') : "0000000000";  // Valor por defecto si no existe

            const concatenado = `${item.NRO_DOC_IDENTIDAD}${item.SERIE_CP}${nroCPDocRellenado}`;
          return {
            ruc: item.RUC || "20538271366",
            razonSocial: item.RAZON_SOCIAL ,
            periodoDetalle: item.PERIODO,
            carSunat: concatenado || "",
            fechaEmision: item.FECHA_EMISION_PAS ,
            fechaVctoPago: item.FECHA_VENCIMIENTO_PAS || "",
            tipoCPDoc: item.TIPO_CP ,
            serieCDP: item.SERIE_CP ,
            anioX: item.ANIO ,
            nroCPDoc: item.NRO_CP ,
            nroFinalRango: item.NRO_FINAL ,
            tipoDocIdentidad: item.TIPO_DOC_IDENTIDAD ,
            nroDocIdentidad: item.NRO_DOC_IDENTIDAD,
            apellidosNombres: item.NOMBRE_CLIENTE ,
            biGravadoDG: item.BI_GRAVADA_DG ,
            igvIpmDG: item.IGV_IPM_DG ,
            biGravadoDGNG: item.BI_GRAVADA_DGNG ,
            igvIpmDGNG: item.IGV_IPM_DGNG ,
            biGravadoDNG: item.BI_GRAVADA_DNG ,
            igvIpmDNG: item.IGV_IPM_DNG ,
            valorAdqNG: item.VALOR_ADQUIRIDO_NG ,
            isc: item.ISC ,
            icbper: item.ICBPER ,
            otrosTributosCargos: item.OTROS_TRIBUTOS ,
            totalCP: item.TOTAL_CP ,
            moneda: item.MONEDA ,
            tipoCambio: item.TIPO_CAMBIO ,
            fechaEmisionDocModificado: item.FECHA_EMISION_MOD || "",
            tipoCPModificado: item.TIPO_CP_MOD ,
            serieCPModificado: item.SERIE_CP_MOD ,
            codDamODsi: item.COD_DAM_DSI ,
            nroCPModificado: item.NRO_CP_MOD ,
            clasifBssSSS: item.CLAS_BSS ,
            idProyectoOperadores: item.ID_PROYECTO ,
            porcPart: item.PORC_PART ,
            imb: item.IMB ,
            carOrigIndEoI: item.CAR_ORI ,
            detraccion: item.DETRACCION ,
            tipoNota: item.TIPO_NOTA ,
            estComp: item.ESTADO_COMP ,
            incal: item.INCAL ,
            // CLUs vacíos, desde CLU1 a CLU39
            clus: Array(39).fill("").join("|")
          };
        });
  
        // Crear el contenido del archivo TXT
        let contenido = "RUC|Apellidos y Nombres o Razón social|Periodo|CAR SUNAT|Fecha de emisión|Fecha Vcto/Pago|Tipo CP/Doc.|Serie del CDP|Año|Nro CP o Doc. Nro Inicial (Rango)|Nro Final (Rango)|Tipo Doc Identidad|Nro Doc Identidad|Apellidos Nombres/ Razón Social|BI Gravado DG|IGV / IPM DG|BI Gravado DGNG|IGV / IPM DGNG|BI Gravado DNG|IGV / IPM DNG|Valor Adq. NG|ISC|ICBPER|Otros Trib/ Cargos|Total CP|Moneda|Tipo de Cambio|Fecha Emisión Doc Modificado|Tipo CP Modificado|Serie CP Modificado|COD. DAM O DSI|Nro CP Modificado|Clasif de Bss y Sss|ID Proyecto Operadores|PorcPart|IMB|CAR Orig/ Ind E o I|Detracción|Tipo de Nota|Est. Comp.|Incal|CLU1|CLU2|CLU3|CLU4|CLU5|CLU6|CLU7|CLU8|CLU9|CLU10|CLU11|CLU12|CLU13|CLU14|CLU15|CLU16|CLU17|CLU18|CLU19|CLU20|CLU21|CLU22|CLU23|CLU24|CLU25|CLU26|CLU27|CLU28|CLU29|CLU30|CLU31|CLU32|CLU33|CLU34|CLU35|CLU36|CLU37|CLU38|CLU39\n";
  
        // Recorrer el array de datos y construir el contenido del archivo
        data_array.forEach(item => {
          contenido += `${item.ruc}|${item.razonSocial}|${item.periodoDetalle}|${item.carSunat}|${item.fechaEmision}|${item.fechaVctoPago}|${item.tipoCPDoc}|${item.serieCDP}|${item.anioX}|${item.nroCPDoc}|${item.nroFinalRango}|${item.tipoDocIdentidad}|${item.nroDocIdentidad}|${item.apellidosNombres}|${item.biGravadoDG}|${item.igvIpmDG}|${item.biGravadoDGNG}|${item.igvIpmDGNG}|${item.biGravadoDNG}|${item.igvIpmDNG}|${item.valorAdqNG}|${item.isc}|${item.icbper}|${item.otrosTributosCargos}|${item.totalCP}|${item.moneda}|${item.tipoCambio}|${item.fechaEmisionDocModificado}|${item.tipoCPModificado}|${item.serieCPModificado}|${item.codDamODsi}|${item.nroCPModificado}|${item.clasifBssSSS}|${item.idProyectoOperadores}|${item.porcPart}|${item.imb}|${item.carOrigIndEoI}|${item.detraccion}|${item.tipoNota}|${item.estComp}|${item.incal}|${item.clus}\n`;
        });
        console.log(contenido);
        
        /*
        // Crear un Blob con el contenido
        let blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  
        // Crear un enlace para descargar el archivo
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'archivo_generado.txt';
  
        // Simular un clic para descargar el archivo
        link.click();*/
      },
      error: function (jqXHR, estado, error) {
        console.log("Error en la solicitud AJAX: " + error);
      }
    });
  }
  