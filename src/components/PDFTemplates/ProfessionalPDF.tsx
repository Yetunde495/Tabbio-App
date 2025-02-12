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
  small: 8,
  medium: 10,
  large: 12,
};
const fontSizeSmMap = {
  small: 7,
  medium: 8,
  large: 9,
};


const registeredFonts = new Set();

// Pre-register common fonts with URLs
const DEFAULT_FONTS: any = {
  "Times New Roman": "https://pdf-lib.js.org/assets/fonts/liberation-serif.ttf",
  Helvetica:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
};

const ProfessionalPDF = ({ data }: any) => {
  // Get font configuration from data
  const fontFamily = data?.style?.fontFamily || "Helvetica";
  const baseFontSrc = data?.style?.fontSrc
    ? `${window.location.origin}${data.style.fontSrc}`
    : DEFAULT_FONTS[fontFamily];

  // Define font variants based on naming convention
  const fontVariants = {
    regular: baseFontSrc,
    bold: baseFontSrc.replace(".ttf", "-bold.ttf"),
    semibold: baseFontSrc.replace(".ttf", "-semibold.ttf"),
    italic: baseFontSrc.replace(".ttf", "-italic.ttf"),
    boldItalic: baseFontSrc.replace(".ttf", "-bold-italic.ttf"),
  };

  // Register all font variants
  if (fontFamily && !registeredFonts.has(fontFamily)) {
    Font.register({
      family: fontFamily,
      fonts: [
        {
          src: fontVariants.regular,
          fontWeight: "normal",
          fontStyle: "normal",
        },
        { src: fontVariants.bold, fontWeight: "bold", fontStyle: "normal" },
        {
          src: fontVariants.semibold,
          fontWeight: "semibold",
          fontStyle: "normal",
        },
        { src: fontVariants.italic, fontWeight: "normal", fontStyle: "italic" },
        {
          src: fontVariants.boldItalic,
          fontWeight: "bold",
          fontStyle: "italic",
        },
      ],
    });
    registeredFonts.add(fontFamily);
  }

  // Register dynamic font once
  if (data?.style?.fontFamily && data?.style?.fontSrc) {
    const fontKey = `${data.style.fontFamily}-${data.style.fontSrc}`;
    if (!registeredFonts.has(fontKey)) {
      Font.register({
        family: data.style.fontFamily,
        src: data.style.fontSrc,
      });
      registeredFonts.add(fontKey);
    }
  }

  const fontSize =
    fontSizeMap[data?.style?.fontSize as keyof typeof fontSizeMap] || "11px";
  const fontSizeSm =
    fontSizeSmMap[data?.style?.fontSize as keyof typeof fontSizeMap] || "8px";

  const styles = StyleSheet.create({
    page: {
      // fontFamily: resumeData?.style?.fontFamily || "Helvetica",
      padding: 32,
      backgroundColor: "#ffffff",
      fontFamily: fontFamily,
    },
    section: {
      marginBottom: 15,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      paddingBottom: 8,
      marginBottom: 15,
      borderColor: data?.style?.primaryColor,
    },
    name: {
      fontSize: 30,
      fontWeight: "medium",
      textTransform: "uppercase",
      color: data?.style?.primaryColor,
    },
    role: {
      fontSize: 14,
      fontWeight: "medium",
      textTransform: "uppercase",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      // alignItems: "flex-start",
      gap: 8,
      marginBottom: 15,
    },
    contactItem: {
      fontSize: fontSize,
      display: "flex",
      flexDirection: "row",
      // alignItems: "flex-start",
      gap: 4,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "semibold",
      textTransform: "uppercase",
      borderBottomWidth: '1px',
      paddingBottom: 8,
      marginBottom: 8,
      color: data?.style?.primaryColor,
      borderColor: data?.style?.primaryColor,
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
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.name}>{data?.name}</Text>
            <View
              style={{
                width: 1,
                height: "80%",
                borderLeftWidth: 1,
                borderColor: "#3F3F46",
                marginLeft: 8,
                marginRight: 8,
              }}
            ></View>
            {data?.config.role && <Text style={styles.role}>{data?.role}</Text>}
          </View>
          <View style={styles.contactInfo}>
            {["email", "phone", "location", "linkedIn", "website"]
              .filter((field) => data?.config[field])
              .map((field) => (
                <View key={field} style={styles.contactItem}>
                  <Text style={{ fontWeight: "bold" }}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </Text>
                  <Text>{data[field] || "Unspecified"}</Text>
                </View>
              ))}
          </View>
        </View>

        {/* Professional Summary */}
        {data?.config.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.text}>{data?.professionalSummary}</Text>
          </View>
        )}

        {/* Key Skills */}
        {data?.config.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KEY SKILLS</Text>
            <View>
              {data?.skills?.map((item: any, index: number) => (
                <View key={index} style={{ marginBottom: 8, color: "#393942" }}>
                  <Text
                    style={{
                      fontSize: fontSize,
                      fontStyle: "italic",
                      textDecoration: "underline",
                      color: "#71717A",
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
                    {item.items?.map((skillItem: any, skillIndex: number) => (
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
        {data?.config.careerHighlights && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CAREER HIGHLIGHTS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data?.careerHighlights?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: fontSize, fontWeight: "bold" }}>
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
        {data?.config.workExperience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data?.workExperience?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.company}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: fontSize,
                          fontWeight: "semibold",
                          color: "#3F3F46",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{ fontSize: 14, marginLeft: 4, marginRight: 4 }}
                      >
                        |
                      </Text>
                      <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                        {item?.duration}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: fontSize, marginTop: '10px' }}>{item.description}</Text>
                  <View style={{ marginTop: '12px' }}>
                    {item.keyAchievements?.map(
                      (achievement: any, index: number) => (
                        <Text
                          key={index}
                          style={{ fontSize: fontSize, marginBottom: '5px' }}
                        >
                          • {achievement}
                        </Text>
                      )
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {data?.config.education && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data?.education?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "flex-s<",
                        width: "75%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fontSize,
                          fontWeight: "semibold",
                          lineHeight: 1.5,
                          textTransform: "uppercase",
                          width: "50%",
                        }}
                      >
                        {item.institution}
                      </Text>
                      <View
                        style={{
                          width: 1,
                          height: "100%",
                          borderLeftWidth: 1,
                          borderColor: "#3F3F46",
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                      ></View>
                      <Text
                        style={{
                          fontSize: fontSize,
                          fontWeight: "semibold",
                          textTransform: "uppercase",
                          width: "50%",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.degree}
                      </Text>
                    </View>
                    <Text style={{ fontSize: fontSizeSm }}>
                      {item?.duration}
                    </Text>
                  </View>
                  <Text style={{ fontSize: fontSize }}>{item.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Training */}
        {data?.config.trainings && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TRAINING</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data?.trainings?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: fontSize, fontWeight: "semibold" }}
                      >
                        {item.degree}
                      </Text>
                      <Text
                        style={{ fontSize: 14, marginLeft: 4, marginRight: 4 }}
                      >
                        |
                      </Text>
                      <Text style={{ fontSize: fontSize }}>
                        {item.institution}
                      </Text>
                    </View>
                    <Text style={{ fontSize: fontSizeSm }}>
                      {item?.year}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {data?.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data?.certifications?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: fontSize, fontWeight: "semibold" }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{ fontSize: 14, marginLeft: 4, marginRight: 4 }}
                      >
                        |
                      </Text>
                      <Text style={{ fontSize: fontSize }}>
                        {item.institution}
                      </Text>
                    </View>
                    {item.date && (
                      <Text style={{ fontSize: fontSizeSm }}>
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

export default ProfessionalPDF;
