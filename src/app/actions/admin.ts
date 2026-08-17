"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAdmissionStatus(id: string, newStatus: string) {
  try {
    await prisma.admissionApplication.update({
      where: { id },
      data: { status: newStatus }
    });
    
    revalidatePath("/admin/admissions");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteAdmissionApplication(id: string) {
  try {
    await prisma.admissionApplication.delete({ where: { id } });
    revalidatePath("/admin/admissions");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete application", error);
    return { success: false, error: "Failed to delete application" };
  }
}

// Course / Package CRUD
export async function saveCourse(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const studentClass = formData.get("class") as string;
    const description = formData.get("description") as string;
    const subjects = formData.get("subjects") as string;
    const fee = parseFloat(formData.get("fee") as string || "0");
    const duration = formData.get("duration") as string;
    const days = formData.get("days") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const status = (formData.get("status") as string) || "Active";
    const teacherId = (formData.get("teacherId") as string) || null;

    if (id) {
      await prisma.course.update({
        where: { id },
        data: { name, class: studentClass, description, subjects, fee, duration, days, startTime, endTime, status, teacherId: teacherId || null }
      });
    } else {
      await prisma.course.create({
        data: { name, class: studentClass, description, subjects, fee, duration, days, startTime, endTime, maxStudents: 1, status, teacherId: teacherId || null }
      });
    }

    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    return { success: true };
  } catch (error) {
    console.error("Error saving course", error);
    return { success: false, error: "Failed to save course" };
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete course" };
  }
}

// Timetable CRUD
export async function saveTimetable(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const day = formData.get("day") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const studentClass = formData.get("class") as string;
    const subject = formData.get("subject") as string;
    const room = (formData.get("room") as string) || "Home / Online";
    const teacherId = (formData.get("teacherId") as string) || null;

    if (id) {
      await prisma.timetable.update({
        where: { id },
        data: { day, startTime, endTime, class: studentClass, subject, room, teacherId: teacherId || null }
      });
    } else {
      await prisma.timetable.create({
        data: { day, startTime, endTime, class: studentClass, subject, room, teacherId: teacherId || null }
      });
    }

    revalidatePath("/admin/timetable");
    revalidatePath("/timetable");
    return { success: true };
  } catch (error) {
    console.error("Error saving timetable", error);
    return { success: false, error: "Failed to save timetable slot" };
  }
}

export async function deleteTimetable(id: string) {
  try {
    await prisma.timetable.delete({ where: { id } });
    revalidatePath("/admin/timetable");
    revalidatePath("/timetable");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete timetable slot" };
  }
}

// Teacher CRUD
export async function saveTeacher(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const qualification = formData.get("qualification") as string;
    const subjects = formData.get("subjects") as string;
    const experience = formData.get("experience") as string;
    const phone = formData.get("phone") as string;
    const bio = formData.get("bio") as string;
    const status = (formData.get("status") as string) || "Active";

    if (id) {
      await prisma.teacher.update({
        where: { id },
        data: { name, qualification, subjects, experience, phone, bio, status }
      });
    } else {
      await prisma.teacher.create({
        data: { name, qualification, subjects, experience, phone, bio, status }
      });
    }

    revalidatePath("/admin/teachers");
    return { success: true };
  } catch (error) {
    console.error("Error saving teacher", error);
    return { success: false, error: "Failed to save tutor details" };
  }
}

export async function deleteTeacher(id: string) {
  try {
    await prisma.teacher.delete({ where: { id } });
    revalidatePath("/admin/teachers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete teacher" };
  }
}

// Settings Action
export async function updateWebsiteSettings(formData: FormData) {
  try {
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;

    const existing = await prisma.websiteSettings.findFirst();
    if (existing) {
      await prisma.websiteSettings.update({
        where: { id: existing.id },
        data: { phone, whatsapp, email, address, city }
      });
    } else {
      await prisma.websiteSettings.create({
        data: { instituteName: "The Best Tutor - Home Tuition", phone, whatsapp, email, address, city }
      });
    }

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update settings" };
  }
}
