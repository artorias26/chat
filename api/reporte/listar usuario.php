<?php
include "../fpdf/fpdf.php";
include "../conexion/dataBase.php";
    
    $dataBase = new DataBase;
    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial','B',25);
    $pdf->Cell(0, 25, "Reporte de Usuarios", 0, 0, 'C');
    $pdf->Ln(20);
    $pdf->Cell(190,0,"",1,1,'C');

    $pdf->Ln(10);
    $pdf->SetFont("Arial", "B", "12");
    $pdf->SetFillColor(255,255,255);
    $pdf->Cell(35,8, "Nombre", 0, 0, 'C');
    $pdf->Cell(35,8, "Apellido", 0, 0, 'C');
    $pdf->Cell(55,8, "Correo electronico", 0, 0, 'C');
    $pdf->Cell(30,8, "Clave", 0, 0, 'C');
    $pdf->Cell(30,8, "Perfil", 0, 0, 'C');
    $pdf->Ln(8);
    $pdf->Cell(190,0,"",1,1,'C');

    $select = $dataBase->mysqli()->query("
        SELECT usuario.*, perfil.nombre AS perfil FROM usuario 
        INNER JOIN perfil
        ON usuario.id_perfil = perfil.id 
        WHERE usuario.estatus = 1 ORDER BY perfil.nombre, usuario.id ASC
    ");

    if ($select->num_rows > 0) {
        while ($data = $select->fetch_array(MYSQLI_ASSOC)) {
            $pdf->Ln(8);
            $pdf->SetFont("Arial", "", "12");
            $pdf->Cell(35, 0, $data['nombre'], 0, 0, 'C');
            $pdf->Cell(35, 0, $data['apellido'], 0, 0, 'C');
            $pdf->Cell(55, 0, $data['correo'], 0, 0, 'C');
            $pdf->Cell(30, 0, $data['clave'], 0, 0, 'C');
            $pdf->Cell(30, 0, $data['perfil'], 0, 0, 'C');
            $pdf->Ln(4);
            $pdf->SetDrawColor(209, 209, 209);
            $pdf->Cell(190, 0, "", 1, 1, 'C');           
        }
    }

    $pdf->Output();
?>