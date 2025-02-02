/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Document,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import { formatMonthYear } from "../../lib/utils/formatters";

const fontSizeMap = {
  small: 14,
  medium: 16,
  large: 18,
};
const fontSizeSmMap = {
  small: 13,
  medium: 14,
  large: 15,
};

// Helper function to get font sizes
const getFontSize = (resumeData: any) => {
  return (
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px"
  );
};

const getFontSizeSm = (resumeData: any) => {
  return (
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeSmMap] ||
    "14px"
  );
};

// Define styles for the PDF
const createStyles = (resumeData) => {
  const fontSize = getFontSize(resumeData);
  const fontSizeSm = getFontSizeSm(resumeData);

  return StyleSheet.create({
    page: {
      // fontFamily: resumeData?.style?.fontFamily || "Helvetica",
      padding: 32,
      backgroundColor: "#ffffff",
    },
    section: {
      marginBottom: 15,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 2,
      paddingBottom: 8,
      marginBottom: 15,
      borderColor: resumeData?.style?.primaryColor,
    },
    name: {
      fontSize: 40,
      fontWeight: "medium",
      textTransform: "uppercase",
      color: resumeData?.style?.primaryColor,
    },
    role: {
      fontSize: 18,
      fontWeight: "medium",
      textTransform: "uppercase",
      paddingLeft: 8,
    },
    contactInfo: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 15,
    },
    contactItem: {
      fontSize: fontSizeSm,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "semibold",
      textTransform: "uppercase",
      borderBottomWidth: 2,
      paddingBottom: 4,
      marginBottom: 8,
      color: resumeData?.style?.primaryColor,
      borderColor: resumeData?.style?.primaryColor,
    },
    text: {
      fontSize: fontSize,
      fontWeight: "medium",
      color: "#000000",
    },
    listItem: {
      fontSize: fontSize,
      marginBottom: 4,
    },
    link: {
      fontSize: fontSizeSm,
      color: "#2563eb",
      textDecoration: "none",
    },
  });
};

const EntryPDF = ({ resumeData }: any) => {
  const styles = createStyles(resumeData);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData?.name}</Text>
            {resumeData?.config.role && (
              <Text style={styles.role}>{resumeData?.role}</Text>
            )}
          </View>
          <View style={styles.contactInfo}>
            {["email", "phone", "location", "linkedin", "website"]
              .filter((field) => resumeData?.config[field])
              .map((field) => (
                <View key={field} style={styles.contactItem}>
                  <Text style={{ fontWeight: "semibold" }}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </Text>
                  <Text>{resumeData[field] || "Unspecified"}</Text>
                </View>
              ))}
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData?.config.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.text}>{resumeData?.professionalSummary}</Text>
          </View>
        )}

        {/* Key Skills */}
        {resumeData?.config.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KEY SKILLS</Text>
            <View>
              {resumeData?.skills?.map((item, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text
                    style={{
                      fontSize: fontSize,
                      fontStyle: "italic",
                      textDecoration: "underline",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    {item.items?.map((skillItem, skillIndex) => (
                      <Text key={skillIndex} style={{ fontSize: fontSize }}>
                        {skillItem}
                        {skillIndex + 1 !== item.items.length && " | "}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Career Highlights */}
        {resumeData?.config.careerHighlights && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CAREER HIGHLIGHTS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {resumeData?.careerHighlights?.map((item) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: fontSize, fontWeight: "semibold" }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: fontSize }}>{item.description}</Text>
                  {item.link && (
                    <Link src={item.link} style={styles.link}>
                      {item.link}
                    </Link>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Professional Experience */}
        {resumeData?.config.workExperience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {resumeData?.workExperience?.map((item) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.company}
                    </Text>
                    <Text style={{ fontSize: fontSize }}>{item.title}</Text>
                    <Text style={{ fontSize: fontSize }}>
                      {item.startDate && formatMonthYear(item.startDate)} -{" "}
                      {item.active
                        ? "Present"
                        : item.endDate && formatMonthYear(item.endDate)}
                    </Text>
                  </View>
                  <Text style={{ fontSize: fontSize }}>{item.description}</Text>
                  <View style={{ marginTop: 8 }}>
                    {item.keyAchievements?.map((achievement, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: fontSize, marginBottom: 4 }}
                      >
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {resumeData?.config.education && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {resumeData?.education?.map((item) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.institution}
                    </Text>
                    <Text style={{ fontSize: fontSize }}>
                      {item.startDate && formatMonthYear(item.startDate)} -{" "}
                      {item.active
                        ? "Present"
                        : item.endDate && formatMonthYear(item.endDate)}
                    </Text>
                  </View>
                  <Text style={{ fontSize: fontSize }}>{item.degree}</Text>
                  <Text style={{ fontSize: fontSize }}>{item.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Training */}
        {resumeData?.config.trainings && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TRAINING</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {resumeData?.trainings?.map((item) => (
                <View key={item._id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.degree}
                    </Text>
                    <Text style={{ fontSize: fontSize }}>
                      {item.institution}
                    </Text>
                    <Text style={{ fontSize: fontSize }}>
                      {item.startDate && formatMonthYear(item.startDate)} -{" "}
                      {item.active
                        ? "Present"
                        : item.endDate && formatMonthYear(item.endDate)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {resumeData?.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {resumeData?.certifications?.map((item) => (
                <View key={item._id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: fontSize }}>
                      {item.institution}
                    </Text>
                    {item.date && (
                      <Text style={{ fontSize: fontSize }}>
                        {formatMonthYear(item.date)}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default EntryPDF;
