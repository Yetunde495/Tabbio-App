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
      border: 0,
    },
    section: {
      marginBottom: 20,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      paddingBottom: 6,
      marginBottom: 10,
      borderColor: data?.style?.primaryColor,
    },
    name: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: "uppercase",
      color: data?.style?.primaryColor,
      maxWidth: "60%",
    },
    role: {
      fontSize: 12,
      fontWeight: 600,
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
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      borderBottomWidth: "1px",
      paddingBottom: 8,
      marginBottom: 8,
      color: data?.style?.primaryColor,
      borderColor: data?.style?.primaryColor,
    },
    text: {
      fontSize: fontSize,
      fontWeight: 500,
      color: "#000000",
      lineHeight: 1.5,
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
    <Document style={{ border: 0 }}>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {data?.name} {data?.config?.role && " "}
            </Text>

            {data?.config.role && (
              <Text style={styles.role}>
                {data?.config?.role && " " + "|" + " "}
                {data?.role}
              </Text>
            )}
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
        {data?.config.skills && data?.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KEY SKILLS</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 4,
              }}
            >
              {data?.skills?.map((item: any, index: number) => (
                <View key={index} style={{ marginBottom: 8, color: "#393942" }}>
                  <Text
                    style={{
                      fontSize: fontSize,
                    }}
                  >
                    {item}
                    {index + 1 !== data?.skills?.length && " | "}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Career Highlights */}
        {data?.config.careerHighlights &&
          data?.careerHighlights?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CAREER HIGHLIGHTS</Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}
              >
                {data?.careerHighlights?.map((item: any) => (
                  <View key={item.id} style={{}}>
                    <Text
                      style={{
                        fontSize: fontSize,
                        fontWeight: "bold",
                        marginBottom: 8,
                      }}
                    >
                      {item?.title}
                    </Text>
                    <Text style={{ fontSize: fontSize, marginBottom: 10 }}>
                      {item?.description}
                    </Text>
                    {item?.link && (
                      <Link
                        src={item.link}
                        style={{
                          fontSize: fontSize,
                          fontWeight: "semibold",
                          color: "#2563eb",
                          textDecoration: "none",
                        }}
                      >
                        {item.link}
                      </Link>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

        {/* Professional Experience */}
        {data?.config?.workExperience && data?.workExperience?.length > 0 && (
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
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.company}
                    </Text>

                    <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                      {item?.startDate && formatMonthYear(item?.startDate)}
                      {item?.active
                        ? "- Present"
                        : item?.endDate &&
                          "- " + formatMonthYear(item?.endDate)}
                    </Text>
                  </View>
                  <View>
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
                  </View>
                  <Text style={{ fontSize: fontSize, marginTop: "10px" }}>
                    {item.description}
                  </Text>
                  <View style={{ marginTop: "12px" }}>
                    {item.keyAchievements?.map(
                      (achievement: any, index: number) => (
                        <Text
                          key={index}
                          style={{ fontSize: fontSize, marginBottom: "7px" }}
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
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 8,
              }}
            >
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
                        lineHeight: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fontSize,
                          fontWeight: 600,
                          lineHeight: "0.8rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {item?.degree} {item?.gpa && "(" + item?.gpa + ")"}
                      </Text>
                    </View>
                    <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                      {item?.startDate && formatMonthYear(item?.startDate)}
                      {item?.hideEndDate && (
                        <span>
                          -{" "}
                          {item?.endDate
                            ? "Present"
                            : item?.endDate && formatMonthYear(item?.endDate)}
                        </span>
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontSize: fontSize }}>
                      {item.institution}
                    </Text>
                    {item?.location && (
                      <Text
                        style={{
                          fontStyle: "italic",
                          fontSize: fontSize,
                        }}
                      >
                        , {item?.location}
                      </Text>
                    )}
                  </View>

                  {item?.minors && (
                    <View
                      style={{
                        fontSize: fontSize,
                        marginBottom: 8,
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                      }}
                    >
                      <Text style={{ fontWeight: "semibold", marginTop: 2 }}>
                        Minors:
                      </Text>
                      <Text>{item?.minors}</Text>
                    </View>
                  )}
                  {item?.relevantCourseWork?.length > 0 && (
                    <View
                      style={{
                        fontSize: fontSize,
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                      }}
                    >
                      <Text style={{ fontWeight: "semibold", marginTop: 2 }}>
                        Relevant Coursework:
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        {item?.relevantCourseWork?.map(
                          (val: string, index: number) => (
                            <Text key={index}>
                              {val}{" "}
                              {item?.relevantCourseWork?.length > 1 &&
                                index + 1 !==
                                  item?.relevantCourseWork?.length &&
                                ","}
                            </Text>
                          )
                        )}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {data?.config?.internships && data?.internships?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INTERNSHIPS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data?.internships?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: fontSize, fontWeight: "semibold" }}
                    >
                      {item.company}
                    </Text>

                    <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                      {item?.startDate && formatMonthYear(item?.startDate)}
                      {item?.active
                        ? "- Present"
                        : item?.endDate &&
                          "- " + formatMonthYear(item?.endDate)}
                    </Text>
                  </View>
                  <View>
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
                  </View>
                  <Text style={{ fontSize: fontSize, marginTop: "10px" }}>
                    {item.description}
                  </Text>
                  <View style={{ marginTop: "12px" }}>
                    {item.keyAchievements?.map(
                      (achievement: any, index: number) => (
                        <Text
                          key={index}
                          style={{ fontSize: fontSize, marginBottom: "7px" }}
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

        {data?.config?.volunteerExperience &&
          data?.volunteerExperience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>VOLUNTEER EXPERIENCE</Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {data?.volunteerExperience?.map((item: any) => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{ fontSize: fontSize, fontWeight: "semibold" }}
                      >
                        {item.company}
                      </Text>

                      <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                        {item?.startDate && formatMonthYear(item?.startDate)}
                        {item?.active
                          ? "- Present"
                          : item?.endDate &&
                            "- " + formatMonthYear(item?.endDate)}
                      </Text>
                    </View>
                    <View>
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
                    </View>
                    <Text style={{ fontSize: fontSize, marginTop: "10px" }}>
                      {item.description}
                    </Text>
                    <View style={{ marginTop: "12px" }}>
                      {item.keyAchievements?.map(
                        (achievement: any, index: number) => (
                          <Text
                            key={index}
                            style={{ fontSize: fontSize, marginBottom: "7px" }}
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

        {data?.config?.certifications && data?.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS & TRAININGS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data?.certifications?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize,
                        fontWeight: "semibold",
                        color: "#3F3F46",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                      {formatMonthYear(item?.date)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: fontSize,
                        color: "#3F3F46",
                      }}
                    >
                      {item.institution}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data?.config.projects && data?.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {data?.projects?.map((item: any) => (
                <View key={item.id} style={{}}>
                  <Text
                    style={{
                      fontSize: fontSize,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text style={{ fontSize: fontSize, marginBottom: 8 }}>
                    {item?.description}
                  </Text>
                  {item?.link && (
                    <Link
                      src={item.link}
                      style={{
                        fontSize: fontSize,
                        fontWeight: "semibold",
                        color: "#2563eb",
                        textDecoration: "none",
                      }}
                    >
                      {item.link}
                    </Link>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {data?.config?.memberships && data?.membership?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MEMBERSHIPS</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data?.membership?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize,
                        fontWeight: "semibold",
                        color: "#3F3F46",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.role}
                    </Text>

                    <Text style={{ fontSize: fontSizeSm, color: "#71717A" }}>
                      {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                      {item?.endDate
                        ? "Present"
                        : item?.endDate && formatMonthYear(item?.endDate)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: fontSize,
                        color: "#3F3F46",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        {data?.config?.references && data?.references?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL REFERENCES</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data?.references?.map((item: any) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize,
                        fontWeight: "semibold",
                        color: "#3F3F46",
                        textTransform: "uppercase",
                      }}
                    >
                      {item?.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: fontSizeSm,
                        color: "#000000d6",
                        fontStyle: "italic",
                      }}
                    >
                      {item?.relationship}
                    </Text>
                  </View>
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: fontSize,
                        color: "#3F3F46",
                      }}
                    >
                      {item?.title} at {item?.company}
                    </Text>
                  </View>

                  <View
                    style={{
                      fontSize: fontSize,
                      marginBottom: 8,
                      display: "flex",
                      flexDirection: "row",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "semibold",
                        marginTop: 2,
                        color: "#1b38dd",
                      }}
                    >
                      Contact Information:
                    </Text>
                  
                      {item?.email && (
                        <Text style={{ fontStyle: "italic", color: "#353232" }}>
                          (E)- {item?.email}
                        </Text>
                      )}
                      {item?.phone && (
                        <Text style={{ fontStyle: "italic", color: "#353232" }}>
                          (P)- {item?.phone}
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
