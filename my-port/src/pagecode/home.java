// ═══════════════════════════════════════════════════════
// Advaitya Jadhav — Portfolio
// ═══════════════════════════════════════════════════════

import java.util.List;

import portfolio.core.Engineer;
import portfolio.core.Dream;

/**
 * @author Advaitya Jadhav
 * @role Systems Engineer | Full-Stack Dev
 * @status Wissen Technology Intern → Joining Full-Time
 * @location India (Remote)
 */

public class Home {

    public static void main(String[] args) {
        Engineer me = new Engineer("Advaitya Jadhav")
                .withRole("Systems Engineer | Full-Stack Dev")
                .withStatus("Wissen Technology Intern → Joining Full-Time")
                .withLocation("India (Remote)")
                .withSkills(List.of("Java", "Python", "React", "SQL", "AWS"))
                .withProjects(List.of(
                        new Dream.Project("Project A", "A full-stack web app built with React and Spring Boot."),
                        new Dream.Project("Project B", "A machine learning model for predicting stock prices.")
                ));
                .withContactInfo("Email: abc@example.com")
                .withAbout("Passionate about building scalable software and learning new technologies. Always eager to take on new challenges and contribute to impactful projects.");

        System.out.println(me);
    }
}