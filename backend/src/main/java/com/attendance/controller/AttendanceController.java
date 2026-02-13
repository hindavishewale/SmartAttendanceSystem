package com.attendance.controller;

import com.attendance.dto.ApiResponse;
import com.attendance.dto.AttendanceDTO;
import com.attendance.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<AttendanceDTO>> addAttendance(@Valid @RequestBody AttendanceDTO dto) {
        AttendanceDTO savedAttendance = attendanceService.addAttendance(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Attendance added successfully", savedAttendance));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<AttendanceDTO>>> getAllAttendance() {
        List<AttendanceDTO> attendanceList = attendanceService.getAllAttendance();
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Attendance retrieved successfully", attendanceList));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AttendanceDTO>> getAttendanceById(@PathVariable Long id) {
        AttendanceDTO attendance = attendanceService.getAttendanceById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Attendance found", attendance));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AttendanceDTO>> updateAttendance(
            @PathVariable Long id, 
            @Valid @RequestBody AttendanceDTO dto) {
        AttendanceDTO updatedAttendance = attendanceService.updateAttendance(id, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Attendance updated successfully", updatedAttendance));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Attendance deleted successfully", null));
    }
}
