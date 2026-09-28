package com.petadoption.dto;

import java.time.LocalDateTime;

public class AdoptionRequestDTO {
    private Long requestId;
    private Long userId;
    private String petId;
    private String petName;
    private String applicantName;
    private String applicantEmail;
    private String applicantPhone;
    private String applicantAddress;
    private String reasonForAdoption;
    private boolean hasExperience;
    private String homeEnvironment;
    private String status;
    private LocalDateTime requestDate;
    private LocalDateTime reviewedDate;
    private Long reviewedBy;

    public AdoptionRequestDTO() {}

    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getPetId() { return petId; }
    public void setPetId(String petId) { this.petId = petId; }
    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }
    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }
    public String getApplicantEmail() { return applicantEmail; }
    public void setApplicantEmail(String applicantEmail) { this.applicantEmail = applicantEmail; }
    public String getApplicantPhone() { return applicantPhone; }
    public void setApplicantPhone(String applicantPhone) { this.applicantPhone = applicantPhone; }
    public String getApplicantAddress() { return applicantAddress; }
    public void setApplicantAddress(String applicantAddress) { this.applicantAddress = applicantAddress; }
    public String getReasonForAdoption() { return reasonForAdoption; }
    public void setReasonForAdoption(String reasonForAdoption) { this.reasonForAdoption = reasonForAdoption; }
    public boolean isHasExperience() { return hasExperience; }
    public void setHasExperience(boolean hasExperience) { this.hasExperience = hasExperience; }
    public String getHomeEnvironment() { return homeEnvironment; }
    public void setHomeEnvironment(String homeEnvironment) { this.homeEnvironment = homeEnvironment; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDateTime requestDate) { this.requestDate = requestDate; }
    public LocalDateTime getReviewedDate() { return reviewedDate; }
    public void setReviewedDate(LocalDateTime reviewedDate) { this.reviewedDate = reviewedDate; }
    public Long getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(Long reviewedBy) { this.reviewedBy = reviewedBy; }
}
