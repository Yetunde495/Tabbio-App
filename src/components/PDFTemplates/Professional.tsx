/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    marginTop: 4,
  },
  contact: {
    fontSize: 10,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "1px solid #ccc",
    marginBottom: 10,
  },
  sectionContent: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 4,
  },
  listItemTitle: {
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 10,
  },
});
const Professional = ({ data }: { data: any }) => (
  <Document>
    <Page style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.role}</Text>
        <Text style={styles.contact}>
          E: {data.email} | P: {data.phone} | L: {data.location}
        </Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
        <Text>{data.professionalSummary}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        <View style={styles.sectionContent}>
          {data.education.map((item: any, index: number) => (
            <View key={index}>
              <Text style={styles.listItemTitle}>• {item.institution}</Text>
              <Text>{item.degree}</Text>
              <Text style={styles.smallText}>
                {item.startDate}- {item.endDate}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
        <View style={styles.sectionContent}>
          {data.certifications.map((item: any, index: number) => (
            <Text key={index} style={styles.listItem}>
              • {item.institution} - {item.name} ({item.date})
            </Text>
          ))}
        </View>
      </View>

      {/* Relevant Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RELEVANT COURSES</Text>
        <View style={styles.sectionContent}>
          {data.relevantCourses.map((item: string, index: number) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>
      </View>

      {/* Professional Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        <View style={styles.sectionContent}>
          {data.workExperience.map((item: any, index: number) => (
            <View key={index}>
              <Text style={styles.listItemTitle}>
                {item.company} - {item.title}
              </Text>
              <Text style={styles.smallText}>
                {item.startDate} - {item.endDate}
              </Text>
              {item.keyAchievements.map((item: string, index: number) => (
                <Text key={index}>• {item}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Internships */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INTERNSHIPS</Text>
        <View style={styles.sectionContent}>
          {data.internships.map((item: any, index: number) => (
            <View key={index}>
              <Text style={styles.listItemTitle}>
                {item.company} - {item.title}
              </Text>
              <Text style={styles.smallText}>
                {item.startDate} - {item.endDate}
              </Text>
              {item.keyAchievements.map((item: string, index: number) => (
                <Text key={index}>• {item}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Volunteer Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VOLUNTEER EXPERIENCE</Text>
        <View style={styles.sectionContent}>
          {data.volunteerExperience.map((item: any, index: number) => (
            <View key={index}>
              <Text style={styles.listItemTitle}>
                {item.company} - {item.title}
              </Text>
              <Text style={styles.smallText}>
                {item.startDate} - {item.endDate}
              </Text>
              {item.keyAchievements.map((item: string, index: number) => (
                <Text key={index}>• {item}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default Professional;


