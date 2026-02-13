package com.attendance.service;

import com.attendance.dto.AttendanceDTO;
import com.attendance.exception.ResourceNotFoundException;
import com.attendance.model.Attendance;
import com.attendance.model.Student;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    public AttendanceDTO addAttendance(AttendanceDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
            .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + dto.getStudentId()));
        
        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setDate(dto.getDate());
        attendance.setStatus(dto.getStatus());
        
        Attendance saved = attendanceRepository.save(attendance);
        return convertToDTO(saved);
    }
    
    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public AttendanceDTO getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        return convertToDTO(attendance);
    }
    
    public AttendanceDTO updateAttendance(Long id, AttendanceDTO dto) {
        Attendance attendance = attendanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        
        if (dto.getStudentId() != null) {
            Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + dto.getStudentId()));
            attendance.setStudent(student);
        }
        
        if (dto.getDate() != null) {
            attendance.setDate(dto.getDate());
        }
        
        if (dto.getStatus() != null) {
            attendance.setStatus(dto.getStatus());
        }
        
        Attendance updated = attendanceRepository.save(attendance);
        return convertToDTO(updated);
    }
    
    public void deleteAttendance(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        attendanceRepository.delete(attendance);
    }
    
    private AttendanceDTO convertToDTO(Attendance attendance) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setAttendanceId(attendance.getAttendanceId());
        dto.setStudentId(attendance.getStudent().getId());
        dto.setStudentName(attendance.getStudent().getName());
        dto.setDate(attendance.getDate());
        dto.setStatus(attendance.getStatus());
        return dto;
    }
}
