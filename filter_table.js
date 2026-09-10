function filter($th, table, i) {
    var isFiltered = false;  // Inicialmente no hay filtro

    function toggleFilterList($filterContainer, isVisible) {
        if (isVisible) {
            $filterContainer.show();
        } else {
            $filterContainer.hide();
        }
    }

    if (!$th.hasClass("btn-column")) {
        var title = $th.text();
        var $filterContainer = $('<div class="filter-container" style="display:none;"></div>');
        var $list = $('<ul class="filter-list"></ul>');
        var uniqueValues = [];

        table.column(i).nodes().to$().each(function () {
            var cellText = $(this).clone().find("button, .btn, a").remove().end().text().trim();
            if (cellText && uniqueValues.indexOf(cellText) === -1) {
                uniqueValues.push(cellText);
            }
        });

        uniqueValues.sort();

        // Agregar la opción "Seleccionar todas"
        var $selectAllLi = $('<li></li>');
        var $selectAllCheckbox = $('<input type="checkbox" class="filter-checkbox" checked id="select-all" />');
        var $selectAllLabel = $('<label> (Seleccionar todas)</label>');  // Etiqueta para "Seleccionar todas"
        $selectAllLi.append($selectAllCheckbox).append($selectAllLabel);
        $list.append($selectAllLi);

        // Actualizar el estilo del texto de "Seleccionar todas" según su estado
        updateLabelStyle($selectAllCheckbox, $selectAllLabel);

        // Añadir evento para hacer clic en el texto (label) de "Seleccionar todas"
        $selectAllLabel.on('click', function () {
            $selectAllCheckbox.prop('checked', !$selectAllCheckbox.prop('checked'));  // Alternar el estado del checkbox
            toggleApplyButtonState();
            updateLabelStyle($selectAllCheckbox, $selectAllLabel);  // Actualizar el estilo del texto de "Seleccionar todas"
            updateAllCheckboxes($selectAllCheckbox.prop('checked'));  // Sincronizar con los otros checkboxes
        });

        uniqueValues.forEach(function (value) {
            var $li = $('<li></li>');
            var $checkbox = $(`<input type="checkbox" checked class="filter-checkbox" value="${value}" />`);
            var $label = $(`<label>${value}</label>`);  // Etiqueta para envolver el texto
            $li.append($checkbox).append($label);
            $list.append($li);

            // Añadir evento para hacer clic en el texto (label)
            $label.on('click', function () {
                $checkbox.prop('checked', !$checkbox.prop('checked'));  // Alternar el estado del checkbox
                toggleApplyButtonState();  // Actualizar el estado del botón de "Aplicar Filtro"
                updateLabelStyle($checkbox, $label);  // Actualizar el estilo del texto
            });

            // Actualizar el estilo del texto según el estado del checkbox
            updateLabelStyle($checkbox, $label);
        });

        var $searchInput = $('<input type="text" class="filter-search" placeholder="Buscar...">');
        $filterContainer.prepend($searchInput);

        $searchInput.on('keyup', function () {
            var searchText = $(this).val().toLowerCase();
            $list.find('li').each(function () {
                var listItemText = $(this).text().toLowerCase();
                if (listItemText.indexOf(searchText) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        $filterContainer.append($list);
        var $button = $('<button style="color: white;" class="filter-btn"><i class="fa-solid fa-filter"></i></button>');
        $th.html(title);
        $th.append($button);
        $th.append($filterContainer);

        $button.on('click', function (e) {
            e.stopPropagation();
            var isVisible = $filterContainer.is(':visible');
            toggleFilterList($filterContainer, !isVisible);

            // Desactivar el ordenamiento en la tabla mientras el filtro está abierto
            // if (!isVisible) {
            //     table.order([]).draw();  // Restablecer el orden a "ninguno"
            // }
        });

        var $resetButton = $('<button class="reset-filter-btn" style="display:none;"><i class="fa-solid fa-filter-circle-xmark"></i> Borrar filtro de "' + title + '"</button>');
        $filterContainer.prepend($resetButton);

        $resetButton.on('click', function (e) {
            e.stopPropagation();

            $searchInput.val('');
            $list.find('li').show();

            // Restablecer la selección de checkboxes
            $list.find('.filter-checkbox').prop('checked', true);

            toggleApplyButtonState();  // Actualizar el estado del botón "Aplicar Filtro"
            toggleFilterList($filterContainer, false);

            // Actualizar el color de los textos a verde cuando los checkboxes están marcados
            $list.find('.filter-checkbox').each(function () {
                updateLabelStyle($(this), $(this).next('label'));  // Actualizamos el color de los textos
            });

            // Limpiar el filtro en la columna actual de la tabla
            table.column(i).search('').draw();

            // Actualizar el estado de isFiltered a false cuando se borra el filtro**
            isFiltered = false;

            // Asegurarse de que el icono de filtro se restablezca a "fa-filter" cuando se borra el filtro
            updateFilterIcon();  // Esto actualizará el icono
        });

        var $acceptButton = $('<button class="apply-filter-btn" disabled>Aplicar Filtro</button>');
        $filterContainer.append($acceptButton);

        var $cancelButton = $('<button class="cancel-filter-btn">Cancelar</button>');
        $filterContainer.append($cancelButton);

        $acceptButton.on('click', function (e) {
            e.stopPropagation();

            var selectedValues = [];
            $list.find('.filter-checkbox:checked').each(function () {
                selectedValues.push($(this).val());
            });

            if (selectedValues.length) {
                table.column(i).search(selectedValues.join("|"), true, false).draw();
                isFiltered = true;  // Actualizamos a true cuando se aplica el filtro
            } else {
                table.column(i).search("").draw();
                isFiltered = false;  // Si no hay filtro, se pone en false
            }

            toggleFilterList($filterContainer, false);
            updateFilterIcon();
        });

        $cancelButton.on('click', function (e) {
            e.stopPropagation();
            $searchInput.val(''); // Limpiar el campo de búsqueda

            $list.find('li').show(); // Mostrar todos los elementos de la lista

            // Restablecer la selección de checkboxes
            $list.find('.filter-checkbox').prop('checked', true);  // Puedes marcar todos los checkboxes por defecto si lo deseas


            toggleFilterList($filterContainer, false); // Volver a mostrar la lista y cerrar el filtro

            // Actualizar el color de los textos a verde cuando los checkboxes están marcados
            $list.find('.filter-checkbox').each(function () {
                updateLabelStyle($(this), $(this).next('label'));  // Actualizamos el color de los textos
            });


            table.column(i).search('').draw(); // Limpiar la búsqueda y asegurarse de que el filtro de la tabla se resetee

            isFiltered = false; // Actualizar el estado de isFiltered a false, ya que se cancela el filtro

            // Asegurarse de que el icono de filtro se restablezca a "fa-filter" cuando se borra el filtro
            updateFilterIcon();  // Esto actualizará el icono
        });

        // Función para manejar el checkbox "Seleccionar todas"
        $selectAllCheckbox.on('change', function () {
            var isChecked = $(this).prop('checked');
            $list.find('.filter-checkbox').prop('checked', isChecked);  // Marcar/desmarcar todos los checkboxes
            toggleApplyButtonState();
            updateLabelStyle($selectAllCheckbox, $selectAllLabel);  // Actualizar el estilo del texto de "Seleccionar todas"
            updateAllCheckboxes(isChecked);  // Sincronizar con los otros checkboxes
        });

        // Sincronización de checkboxes individuales (no afecta el checkbox "Seleccionar todas")
        $list.on('change', '.filter-checkbox', function () {
            // Verificar si todos los checkboxes están seleccionados
            var allChecked = $list.find('.filter-checkbox').length === $list.find('.filter-checkbox:checked').length;
            $selectAllCheckbox.prop('checked', allChecked);  // Si todos están seleccionados, marca "Seleccionar todas"
            toggleApplyButtonState();
        });

        function toggleApplyButtonState() {
            var anyChecked = $list.find('.filter-checkbox:checked').length > 0;
            $acceptButton.prop('disabled', !anyChecked);
        }

        toggleApplyButtonState();

        function updateFilterIcon() {
            var $filterIcon = $button.find('i');
            if (isFiltered) {
                $filterIcon.removeClass('fa-filter').addClass('fa-times equis');
                $resetButton.show();  // Mostrar el botón de "Borrar filtro"
            } else {
                $filterIcon.removeClass('fa-times equis').addClass('fa-filter');
                $resetButton.hide();  // Ocultar el botón de "Borrar filtro"
            }
        }

        // Actualizar el estilo del texto según el estado del checkbox
        function updateLabelStyle($checkbox, $label) {
            if ($checkbox.prop('checked')) {
                $label.css('color', 'green');  // Resaltar el texto en verde cuando esté marcado
            } else {
                $label.css('color', '');  // Restaurar el color original cuando no esté marcado
            }
        }

        // Función para sincronizar todos los checkboxes cuando "Seleccionar todas" cambia
        function updateAllCheckboxes(isChecked) {
            $list.find('.filter-checkbox').prop('checked', isChecked);  // Marcar/desmarcar todos los checkboxes
            toggleApplyButtonState();
            $list.find('.filter-checkbox').each(function () {
                updateLabelStyle($(this), $(this).next('label'));  // Actualizar estilo del texto de cada checkbox
            });
        }
    }
}